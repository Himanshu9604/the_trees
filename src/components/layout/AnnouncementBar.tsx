import { siteConfig, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/** Slim top bar with the direct-booking promise and quick contacts. */
export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-navy via-[#22265e] to-navy text-white">
      <div className="container-site flex h-10 items-center justify-between gap-4 text-[0.82rem]">
        <p className="flex min-w-0 items-center gap-2 truncate">
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.72rem] font-semibold">Direct</span>
          <span className="truncate text-white/90">Book directly with the property — zero commission, 24×7 on WhatsApp.</span>
        </p>
        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a href={`tel:${siteConfig.primaryPhone.tel}`} className="inline-flex items-center gap-1.5 text-white/90 hover:text-white">
            <Icon name="phone" size={13} /> {siteConfig.primaryPhone.display}
          </a>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/90 hover:text-white"
          >
            <Icon name="instagram" size={13} /> Instagram
          </a>
          <a
            href={whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to enquire about a stay.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-periwinkle"
          >
            <Icon name="whatsapp" size={13} /> WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
