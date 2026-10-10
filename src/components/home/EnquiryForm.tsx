"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { properties, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { buttonClasses, cn } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";

interface FormState {
  property: string;
  name: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

/** Local calendar date as YYYY-MM-DD. */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.property) e.property = "Please choose a property.";
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (f.phone && !/^[+\d][\d\s-]{7,15}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!f.checkIn) e.checkIn = "Please choose a check-in date.";
  else if (f.checkIn < today()) e.checkIn = "Check-in cannot be in the past.";
  if (!f.checkOut) e.checkOut = "Please choose a check-out date.";
  else if (f.checkIn && f.checkOut <= f.checkIn) e.checkOut = "Check-out must be after check-in.";
  const g = Number(f.guests);
  if (!Number.isInteger(g) || g < 1 || g > 60) e.guests = "Enter the number of guests (1–60).";
  return e;
}

function buildMessage(f: FormState, p: Property) {
  return [
    `Hello ${p.name}, I would like to enquire about a stay.`,
    `Name: ${f.name.trim()}`,
    f.phone && `Phone: ${f.phone.trim()}`,
    `Check-in: ${f.checkIn}`,
    `Check-out: ${f.checkOut}`,
    `Guests: ${f.guests}`,
    f.message.trim() && `Notes: ${f.message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/** Resolves ?property=<slug|legacy-slug> to a property slug. */
function propertyFromQuery(): string {
  const q = new URLSearchParams(window.location.search).get("property");
  if (!q) return "";
  return properties.find((p) => p.slug === q || p.legacySlug === q)?.slug ?? "";
}

export function EnquiryForm({ defaultProperty = "" }: { defaultProperty?: string }) {
  const uid = useId();
  const [form, setForm] = useState<FormState>({
    property: defaultProperty,
    name: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);
  // Set after mount so server and client markup match.
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMinDate(today());
    if (defaultProperty) return;
    const fromQuery = propertyFromQuery();
    if (fromQuery) setForm((f) => ({ ...f, property: fromQuery }));
  }, [defaultProperty]);

  const update = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    setSentVia(null);
  };

  const selected = properties.find((p) => p.slug === form.property);

  const submit = (via: "whatsapp" | "email") => (e?: FormEvent) => {
    e?.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    const firstError = Object.keys(errs)[0];
    if (firstError || !selected) {
      if (firstError) document.getElementById(`${uid}-${firstError}`)?.focus();
      return;
    }
    const text = buildMessage(form, selected);
    if (via === "whatsapp") {
      window.open(whatsappLink(selected.whatsapp, text), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${selected.email}?subject=${encodeURIComponent(
        `Stay enquiry — ${selected.name}`,
      )}&body=${encodeURIComponent(text)}`;
    }
    setSentVia(via);
  };

  const field = (key: keyof FormState) => ({
    id: `${uid}-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
    className: cn(
      "mt-2 h-12 w-full border bg-ivory px-4 text-[0.95rem] text-charcoal transition-colors focus:outline-none",
      errors[key] ? "border-red-700/70 focus:border-red-700" : "border-sand focus:border-gold",
    ),
  });

  const label = (key: keyof FormState, text: string, optional = false) => (
    <label htmlFor={`${uid}-${key}`} className="text-[0.92rem] font-semibold text-forest">
      {text}
      {optional && <span className="ml-1 font-normal tracking-normal text-muted">(optional)</span>}
    </label>
  );

  const error = (key: keyof FormState) =>
    errors[key] && (
      <p id={`${uid}-${key}-error`} className="mt-1.5 text-xs text-red-800">
        {errors[key]}
      </p>
    );

  return (
    <form onSubmit={submit("whatsapp")} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        {label("property", "Property")}
        <select {...field("property")}>
          <option value="">Select a property</option>
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name} — {p.cityLabel}
            </option>
          ))}
        </select>
        {error("property")}
      </div>
      <div>
        {label("name", "Your name")}
        <input type="text" autoComplete="name" {...field("name")} />
        {error("name")}
      </div>
      <div>
        {label("phone", "Phone", true)}
        <input type="tel" autoComplete="tel" inputMode="tel" {...field("phone")} />
        {error("phone")}
      </div>
      <div>
        {label("checkIn", "Check-in")}
        <input type="date" min={minDate} {...field("checkIn")} />
        {error("checkIn")}
      </div>
      <div>
        {label("checkOut", "Check-out")}
        <input type="date" min={form.checkIn || minDate} {...field("checkOut")} />
        {error("checkOut")}
      </div>
      <div className="sm:col-span-2">
        {label("guests", "Guests")}
        <input type="number" min={1} max={60} inputMode="numeric" {...field("guests")} />
        {error("guests")}
      </div>
      <div className="sm:col-span-2">
        {label("message", "Anything we should know?", true)}
        <textarea
          {...field("message")}
          rows={3}
          className={cn(field("message").className, "h-auto py-3")}
          placeholder="Room preference, celebration plans, meal plan…"
        />
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <button type="submit" className={buttonClasses("forest", "flex-1")}>
          <Icon name="whatsapp" size={18} /> Send on WhatsApp
        </button>
        <button type="button" onClick={() => submit("email")()} className={buttonClasses("outline-dark", "flex-1")}>
          <Icon name="mail" size={17} /> Send by email
        </button>
      </div>

      <div className="sm:col-span-2" aria-live="polite">
        <AnimatePresence>
          {sentVia && selected && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3 border border-gold/40 bg-cream p-4 text-sm text-charcoal"
            >
              <Icon name="check" size={18} className="mt-0.5 shrink-0 text-emerald" />
              <span>
                Your enquiry for {selected.name} has been prepared in {sentVia === "whatsapp" ? "WhatsApp" : "your email app"}.
                Please press send there to deliver it — nothing is stored on this website. You can also call{" "}
                <a href={`tel:${selected.phone.tel}`} className="font-semibold text-forest underline underline-offset-4">
                  {selected.phone.display}
                </a>
                .
              </span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
