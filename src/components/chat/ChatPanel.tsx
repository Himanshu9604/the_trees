"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { reply, welcome, type BotReply, type ChatContext, type ChatLink } from "@/lib/chatbot/engine";
import { siteConfig, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/ui";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TreeMark } from "./TreeMark";

type Message = { id: number; from: "guest" | "bot"; text: string; links?: ChatLink[]; suggestions?: string[] };

const STORAGE_KEY = "tree-concierge-v2";
const ease = [0.22, 1, 0.36, 1] as const;

const linkIcon: Record<NonNullable<ChatLink["kind"]>, IconName> = {
  whatsapp: "whatsapp",
  phone: "phone",
  mail: "mail",
  map: "pin",
  page: "arrow-right",
};

// Quick topics shown on the welcome screen.
const topics: { label: string; prompt: string; icon: IconName }[] = [
  { label: "Our properties", prompt: "Show me all properties", icon: "map" },
  { label: "Rooms & villas", prompt: "What rooms and villas are available?", icon: "bed" },
  { label: "Food & meal plan", prompt: "Lonavala meal plan price", icon: "restaurant" },
  { label: "Swimming pool", prompt: "Is there a swimming pool?", icon: "pool" },
  { label: "Celebrations", prompt: "Plan a birthday celebration", icon: "sparkle" },
  { label: "Book directly", prompt: "How do I book directly?", icon: "whatsapp" },
];

function toMessage(id: number, r: BotReply): Message {
  return { id, from: "bot", text: r.text, links: r.links, suggestions: r.suggestions };
}

function loadSession(): { messages: Message[]; ctx: ChatContext } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(messages: Message[], ctx: ChatContext) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-40), ctx }));
  } catch {
    /* storage unavailable — the chat simply won't persist */
  }
}

/** Renders bot text: lines beginning with "• " become a list. */
function BotText({ text }: { text: string }) {
  const blocks: { list: boolean; items: string[] }[] = [];
  for (const line of text.split("\n")) {
    const isItem = line.startsWith("• ");
    const last = blocks[blocks.length - 1];
    if (last && last.list && isItem) last.items.push(line.slice(2));
    else blocks.push({ list: isItem, items: [isItem ? line.slice(2) : line] });
  }
  return (
    <div className="space-y-2">
      {blocks.map((b, i) =>
        b.list ? (
          <ul key={i} className="space-y-1.5">
            {b.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-violet" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{b.items[0]}</p>
        ),
      )}
    </div>
  );
}

export function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>(() => [toMessage(0, welcome)]);
  const [ctx, setCtx] = useState<ChatContext>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  // Restore this tab's conversation.
  useEffect(() => {
    const saved = loadSession();
    if (saved?.messages?.length) {
      setMessages(saved.messages);
      setCtx(saved.ctx ?? {});
      nextId.current = Math.max(...saved.messages.map((m) => m.id)) + 1;
    }
  }, []);

  useEffect(() => saveSession(messages, ctx), [messages, ctx]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || typing) return;
    setMessages((m) => [...m, { id: nextId.current++, from: "guest", text: q }]);
    setInput("");
    setTyping(true);
    const { reply: r, ctx: next } = reply(q, ctx);
    const delay = reduce ? 150 : Math.min(1000, 420 + r.text.length * 2);
    window.setTimeout(() => {
      setMessages((m) => [...m, toMessage(nextId.current++, r)]);
      setCtx(next);
      setTyping(false);
    }, delay);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const reset = () => {
    nextId.current = 1;
    setMessages([toMessage(0, welcome)]);
    setCtx({});
  };

  const fresh = messages.length === 1;
  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="concierge-title"
          className="fixed inset-0 z-[65] flex flex-col overflow-hidden bg-mist text-navy md:inset-auto md:right-6 md:bottom-6 md:h-[min(42rem,calc(100svh-3rem))] md:w-[26rem] md:rounded-[1.75rem] md:border md:border-line md:shadow-[var(--shadow-float)]"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.4, ease }}
          style={{ transformOrigin: "bottom right" }}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-violet to-royal px-5 pt-5 pb-6 text-white">
            <span className="pointer-events-none absolute -top-16 -right-10 size-44 rounded-full bg-white/10" aria-hidden="true" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <TreeMark size={46} className="ring-white/40" />
                <div>
                  <h2 id="concierge-title" className="text-[1.1rem] leading-tight font-semibold text-white">
                    The Tree
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-white/85">
                    <span className="size-2 rounded-full bg-emerald-300" aria-hidden="true" />
                    Here to help, any time
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-3 py-1.5 text-[0.8rem] font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
                >
                  Restart
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close chat"
                  className="flex size-9 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div ref={logRef} role="log" aria-live="polite" className="-mt-3 flex-1 space-y-4 overflow-y-auto rounded-t-[1.25rem] bg-mist px-4 pt-5 pb-4 sm:px-5">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className={cn("flex gap-2.5", m.from === "guest" ? "justify-end" : "justify-start")}
              >
                {m.from === "bot" && <TreeMark size={30} className="mt-0.5" />}
                {m.from === "guest" ? (
                  <p className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet to-royal px-4 py-2.5 text-[0.92rem] leading-relaxed text-white shadow-[0_8px_20px_-12px_rgba(53,36,244,0.7)]">
                    {m.text}
                  </p>
                ) : (
                  <div className="max-w-[86%]">
                    <div className="rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 text-[0.92rem] leading-relaxed text-navy shadow-[0_6px_18px_-14px_rgba(23,33,61,0.4)]">
                      <BotText text={m.text} />
                    </div>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.links.map((l) => {
                          const cls =
                            "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[0.8rem] font-medium text-violet transition-colors hover:border-violet";
                          const inner = (
                            <>
                              <Icon name={linkIcon[l.kind ?? "page"]} size={13} className="shrink-0" />
                              {l.label}
                            </>
                          );
                          return l.external || !l.href.startsWith("/") ? (
                            <a
                              key={l.href + l.label}
                              href={l.href}
                              target={l.external ? "_blank" : undefined}
                              rel={l.external ? "noopener noreferrer" : undefined}
                              className={cls}
                            >
                              {inner}
                            </a>
                          ) : (
                            <Link key={l.href + l.label} href={l.href} onClick={onClose} className={cls}>
                              {inner}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Quick topics on a fresh conversation */}
            {fresh && !typing && (
              <div className="grid grid-cols-2 gap-2 pt-1 pl-10">
                {topics.map((t) => (
                  <button
                    key={t.label}
                    type="button"
                    onClick={() => ask(t.prompt)}
                    className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-left text-[0.84rem] font-medium text-navy transition-all hover:-translate-y-0.5 hover:border-violet hover:text-violet"
                  >
                    <Icon name={t.icon} size={16} className="shrink-0 text-violet" />
                    {t.label}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div className="flex items-center gap-2.5" aria-label="The Tree is typing">
                <TreeMark size={30} />
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-violet"
                      animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.16 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggested follow-ups */}
          {!fresh && lastBot?.suggestions && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-line bg-white px-4 py-3 sm:px-5">
              {lastBot.suggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full bg-lavender px-3 py-1.5 text-[0.8rem] font-medium text-violet-text transition-colors hover:bg-periwinkle"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form onSubmit={onSubmit} className="border-t border-line bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5">
            <div className="flex items-center gap-2 rounded-full border border-line bg-mist p-1.5 pl-4 focus-within:border-violet">
              <label htmlFor="concierge-input" className="sr-only">
                Ask The Tree a question
              </label>
              <input
                ref={inputRef}
                id="concierge-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about rooms, food, pool, booking…"
                autoComplete="off"
                maxLength={300}
                className="h-10 flex-1 bg-transparent text-[0.92rem] text-navy placeholder:text-slate/70 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send question"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet to-royal text-white transition-opacity disabled:opacity-40"
              >
                <Icon name="arrow-right" size={17} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-[0.75rem] text-slate">
              <span>Automated assistant · answers from our property details</span>
              <a
                href={whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to speak to someone about a stay.")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-semibold text-violet hover:text-royal"
              >
                Talk to us
              </a>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

