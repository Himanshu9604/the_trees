"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EnquiryForm } from "./EnquiryForm";

/** The written enquiry form, folded away behind a quiet link. Opens automatically for ?property= links. */
export function EnquiryDisclosure({ defaultProperty, defaultOpen = false }: { defaultProperty?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("property")) setOpen(true);
  }, []);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="enquiry-form-panel"
        onClick={() => setOpen((v) => !v)}
        className="link-line text-[0.95rem] font-semibold text-violet hover:text-royal"
      >
        {open ? "Close the form" : "Prefer to write? Open the enquiry form"}
      </button>
      <motion.div
        id="enquiry-form-panel"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-[var(--shadow-soft)] sm:p-10">
          <p className="text-2xl font-semibold text-navy">
            A written <em>enquiry</em>
          </p>
          <p className="caption mt-2 mb-8 text-ink-muted">
            We prepare the message in WhatsApp or your email app — nothing is stored on this website.
          </p>
          <EnquiryForm defaultProperty={defaultProperty} />
        </div>
      </motion.div>
    </div>
  );
}
