"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { TreeMark } from "./TreeMark";

// The panel and its answer engine load only when a guest first opens the chat.
const ChatPanel = dynamic(() => import("./ChatPanel").then((m) => m.ChatPanel), { ssr: false });

export const CONCIERGE_EVENT = "tree:concierge";
const NUDGE_KEY = "tree-concierge-nudged";

/** Opens the concierge from anywhere (e.g. the mobile action bar). */
export function openConcierge() {
  window.dispatchEvent(new Event(CONCIERGE_EVENT));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [nudge, setNudge] = useState(false);

  const show = () => {
    setLoaded(true);
    setOpen(true);
    setNudge(false);
  };

  useEffect(() => {
    const onOpen = () => {
      setLoaded(true);
      setOpen(true);
      setNudge(false);
    };
    window.addEventListener(CONCIERGE_EVENT, onOpen);
    return () => window.removeEventListener(CONCIERGE_EVENT, onOpen);
  }, []);

  // A single, gentle greeting bubble per visit (desktop only).
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 md:flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.6 } }}
            exit={{ opacity: 0, y: 16 }}
          >
            <AnimatePresence>
              {nudge && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="relative max-w-[15rem] rounded-2xl rounded-br-md border border-line bg-white py-3 pr-9 pl-4 text-sm text-navy shadow-[var(--shadow-float)]"
                >
                  <button type="button" onClick={show} className="text-left">
                    <span className="font-semibold">Planning a stay?</span>
                    <span className="mt-0.5 block text-slate">Ask me about rooms, villas or food.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNudge(false)}
                    aria-label="Dismiss"
                    className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full text-slate hover:bg-mist"
                  >
                    <Icon name="close" size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-violet to-royal py-2 pr-6 pl-2 text-white shadow-[0_18px_40px_-14px_rgba(53,36,244,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <TreeMark size={42} className="ring-white/60" />
              <span className="text-left leading-tight">
                <span className="block text-[0.95rem] font-semibold">Ask The Tree</span>
                <span className="block text-[0.75rem] text-white/80">Instant answers, any time</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {loaded && <ChatPanel open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
