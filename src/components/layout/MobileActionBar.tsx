"use client";

import { siteConfig, whatsappLink } from "@/lib/site";
import { openConcierge } from "@/components/chat/ChatWidget";
import { Icon } from "@/components/ui/Icon";
import { TreeMark } from "@/components/chat/TreeMark";

/** Slim persistent actions on small screens. The body reserves its height (pb-16). */
export function MobileActionBar() {
  const cell = "flex h-16 flex-col items-center justify-center gap-1 text-[0.78rem] font-semibold";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 bg-paper/95 pb-[env(safe-area-inset-bottom)] text-ink backdrop-blur-md md:hidden"
    >
      <a href={`tel:${siteConfig.primaryPhone.tel}`} className={cell}>
        <Icon name="phone" size={16} /> Call
      </a>
      <a
        href={whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to enquire about a stay.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cell} bg-wine text-paper`}
      >
        <Icon name="whatsapp" size={16} /> WhatsApp
      </a>
      <button type="button" onClick={openConcierge} className={cell} aria-haspopup="dialog">
        <TreeMark size={22} />
        Ask The Tree
      </button>
    </nav>
  );
}
