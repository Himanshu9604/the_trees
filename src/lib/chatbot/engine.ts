/**
 * The Tree concierge — a client-side assistant that answers from the site's own data.
 * No backend or paid API: intents are matched by keywords (English + common Hinglish),
 * and every answer is composed from `properties` / `content`, so it never invents facts.
 */
import { amenityLabels, properties, propertyHref, type AmenityKey, type Property } from "@/data/properties";
import { siteConfig, whatsappLink } from "@/lib/site";

export interface ChatLink {
  label: string;
  href: string;
  external?: boolean;
  kind?: "whatsapp" | "phone" | "mail" | "map" | "page";
}

export interface BotReply {
  /** Lines starting with "• " render as a list. */
  text: string;
  links?: ChatLink[];
  suggestions?: string[];
}

export interface ChatContext {
  /** Slug of the property the guest last talked about. */
  propertySlug?: string;
}

type IntentId =
  | "greeting"
  | "thanks"
  | "bye"
  | "human"
  | "meal"
  | "price"
  | "amenity"
  | "rooms"
  | "amenities"
  | "food"
  | "contact"
  | "location"
  | "booking"
  | "celebration"
  | "work"
  | "family"
  | "policy"
  | "overview";

// Keywords: single words match as token prefixes (so "room" matches "rooms"); phrases match as substrings.
const intents: { id: IntentId; keywords: string[] }[] = [
  { id: "greeting", keywords: ["hi", "hello", "hey", "namaste", "namaskar", "good morning", "good evening", "hii", "helo"] },
  { id: "thanks", keywords: ["thank", "thanks", "thx", "dhanyavad", "shukriya", "great", "awesome", "perfect"] },
  { id: "bye", keywords: ["bye", "goodbye", "see you", "alvida", "chalo"] },
  { id: "human", keywords: ["human", "agent", "person", "staff", "manager", "owner", "talk to", "baat"] },
  { id: "meal", keywords: ["meal plan", "meal", "breakfast", "dinner", "lunch", "hi tea", "hi-tea", "menu", "nashta"] },
  {
    id: "price",
    keywords: ["price", "rate", "rates", "tariff", "cost", "charge", "charges", "kitna", "paisa", "paise", "budget", "cheap", "expensive", "per night", "rupees", "rs", "inr", "₹"],
  },
  {
    id: "amenity",
    keywords: ["pool", "swim", "swimming", "wifi", "wi-fi", "internet", "parking", "park", "banquet", "hall", "garden", "kitchen", "cook", "games", "laundry", "reception", "ac", "air condition", "tv", "television", "intercom", "room service", "cafe", "café", "coffee"],
  },
  { id: "rooms", keywords: ["room", "rooms", "kamra", "kamre", "suite", "duplex", "studio", "deluxe", "villa", "villas", "bhk", "cottage", "stay options", "accommodation", "bed", "units", "kitne"] },
  { id: "amenities", keywords: ["amenities", "amenity", "facilities", "facility", "suvidha", "features", "services"] },
  { id: "food", keywords: ["food", "khana", "restaurant", "dining", "eat", "veg", "non veg", "non-veg", "jain"] },
  { id: "contact", keywords: ["contact", "phone", "number", "call", "mobile", "whatsapp", "email", "mail", "sampark", "reach"] },
  { id: "location", keywords: ["where", "address", "location", "located", "kaha", "kahan", "kidhar", "map", "direction", "directions", "pata", "how to reach", "distance", "near", "nearby"] },
  { id: "booking", keywords: ["book", "booking", "reserve", "reservation", "availability", "available", "commission", "direct", "enquiry", "enquire", "inquiry"] },
  { id: "celebration", keywords: ["party", "birthday", "anniversary", "celebration", "celebrate", "event", "function", "wedding", "shaadi", "gathering", "get together", "get-together", "group"] },
  { id: "work", keywords: ["work", "business", "office", "corporate", "meeting", "it park", "official"] },
  { id: "family", keywords: ["family", "kids", "children", "parents", "weekend", "couple", "honeymoon", "friends"] },
  { id: "policy", keywords: ["check in", "check-in", "checkin", "check out", "check-out", "checkout", "timing", "time", "pet", "pets", "dog", "cancel", "cancellation", "refund", "id proof", "unmarried", "smoking", "alcohol", "early", "late"] },
  { id: "overview", keywords: ["properties", "property", "hotels", "hotel", "locations", "destinations", "options", "kaun", "which", "all", "about", "tree"] },
];

const amenityKeywords: [string[], AmenityKey][] = [
  [["pool", "swim", "swimming"], "pool"],
  [["wifi", "wi-fi", "internet"], "wifi"],
  [["parking", "park"], "parking"],
  [["banquet", "hall"], "banquet"],
  [["garden"], "garden"],
  [["kitchen", "cook"], "kitchen"],
  [["games"], "indoor-games"],
  [["laundry"], "laundry"],
  [["reception"], "reception"],
  [["ac", "air condition"], "ac"],
  [["tv", "television"], "tv"],
  [["intercom"], "intercom"],
  [["room service"], "room-service"],
  [["cafe", "café", "coffee"], "cafe"],
];

const propertyKeywords: [string[], string][] = [
  [["ravet"], "hotel-ravet-pune"],
  [["hinjewadi", "hinjawadi", "hinjewdi", "phase 3", "phase3", "it park"], "hotel-hinjewadi-phase-3-pune"],
  [["lonavala", "lonavla", "lonawala", "resort", "villa", "villas", "bhk", "cottage", "hill", "hills", "waksai", "maval"], "resort-lonavala"],
];

/* ---------- text helpers ---------- */

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9À-ɏऀ-ॿ₹\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matcher(text: string) {
  const tokens = text.split(" ");
  return (kw: string) => {
    if (kw.includes(" ") || kw === "₹") return text.includes(kw);
    if (kw.length <= 3) return tokens.includes(kw);
    return tokens.some((t) => t.startsWith(kw));
  };
}

const bySlug = (slug: string) => properties.find((p) => p.slug === slug)!;
const waFor = (p: Property, msg?: string): ChatLink => ({
  label: `WhatsApp ${p.shortName}`,
  href: whatsappLink(p.whatsapp, msg ?? `Hello, I would like to enquire about a stay at ${p.name}.`),
  external: true,
  kind: "whatsapp",
});
const callFor = (p: Property): ChatLink => ({ label: `Call ${p.phone.display}`, href: `tel:${p.phone.tel}`, kind: "phone" });
const pageFor = (p: Property): ChatLink => ({ label: `View ${p.shortName}`, href: propertyHref(p), kind: "page" });
const primaryWa: ChatLink = {
  label: "WhatsApp us",
  href: whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to enquire about a stay."),
  external: true,
  kind: "whatsapp",
};

/* ---------- answers ---------- */

function overview(): BotReply {
  return {
    text: [
      "We have three owner-run properties:",
      ...properties.map((p) => `• ${p.name}: ${p.type.toLowerCase()} in ${p.cityLabel}`),
      "Which one would you like to know more about?",
    ].join("\n"),
    links: properties.map(pageFor),
    suggestions: ["Rooms in Ravet", "Hinjewadi rooms", "Lonavala villas"],
  };
}

function rooms(p?: Property): BotReply {
  if (!p) {
    return {
      text: [
        "Here's what you can book at each property:",
        ...properties.map((x) => `• ${x.shortName}: ${x.rooms.map((r) => r.name).join(", ")}`),
        "Rates depend on dates and occupancy, so the team shares them on enquiry.",
      ].join("\n"),
      links: properties.map(pageFor),
      suggestions: ["Lonavala meal plan", "How do I book?", "Is there a pool?"],
    };
  }
  return {
    text: [
      `${p.type === "Villa" ? "Stays" : "Room types"} at ${p.name}:`,
      ...p.rooms.map((r) => `• ${r.name}: ${r.units} ${r.units === 1 ? "unit" : "units"}`),
      "Rates are shared on enquiry. Send your dates and the team will confirm availability.",
    ].join("\n"),
    links: [waFor(p, `Hello, I would like to check room availability at ${p.name}.`), pageFor(p)],
    suggestions: [`${p.shortName} amenities`, `${p.shortName} address`, "How do I book?"],
  };
}

function amenities(p?: Property): BotReply {
  if (!p) {
    return {
      text: [
        "Amenities by property:",
        ...properties.map((x) => `• ${x.shortName}: ${x.amenities.map((a) => amenityLabels[a]).join(", ")}`),
      ].join("\n"),
      suggestions: ["Is there a pool?", "Food options", "Banquet hall"],
    };
  }
  return {
    text: [`Amenities at ${p.name}:`, ...p.amenities.map((a) => `• ${amenityLabels[a]}`)].join("\n"),
    links: [pageFor(p)],
    suggestions: [`Rooms in ${p.locality}`, "Food options", "How do I book?"],
  };
}

function amenity(key: AmenityKey, p?: Property): BotReply {
  const label = amenityLabels[key];
  const withIt = properties.filter((x) => x.amenities.includes(key));
  if (p) {
    if (p.amenities.includes(key)) {
      return {
        text: `Yes. ${p.name} has ${label.toLowerCase()}.`,
        links: [pageFor(p)],
        suggestions: [`${p.shortName} amenities`, `Rooms in ${p.locality}`],
      };
    }
    return {
      text:
        withIt.length > 0
          ? `${p.name} doesn't list ${label.toLowerCase()}. You'll find it at ${withIt.map((x) => x.name).join(" and ")}.`
          : `${label} isn't listed at any of our properties. The team can confirm on WhatsApp.`,
      links: withIt.length ? withIt.map(pageFor) : [waFor(p)],
    };
  }
  if (withIt.length === properties.length) {
    return { text: `Yes. ${label} is available at all three properties.`, suggestions: ["All amenities"] };
  }
  return {
    text:
      withIt.length > 0
        ? `${label} is available at ${withIt.map((x) => x.name).join(" and ")}.`
        : `${label} isn't listed at our properties. Please check with the team.`,
    links: withIt.length ? withIt.map(pageFor) : [primaryWa],
    suggestions: ["All amenities", "Rooms"],
  };
}

function mealPlan(): BotReply {
  const lonavala = bySlug("resort-lonavala");
  const plan = lonavala.mealPlan!;
  return {
    text: [
      `Villa meal plan at ${lonavala.name}: ${plan.price} ${plan.basis}.`,
      ...plan.courses.map((c) => `• ${c.title}: ${c.items.join(", ")}`),
      ...plan.notes,
    ].join("\n"),
    links: [{ label: "See the meal plan", href: "/properties/resort-lonavala#meal-plan", kind: "page" }, waFor(lonavala)],
    suggestions: ["Lonavala villas", "Food in Pune hotels"],
  };
}

function food(p?: Property): BotReply {
  if (p?.mealPlan) return mealPlan();
  if (p) {
    const bits = [p.amenities.includes("restaurant") && "an in-house restaurant", p.amenities.includes("cafe") && "a café", p.amenities.includes("room-service") && "room service"].filter(Boolean);
    return {
      text: `${p.name} has ${bits.join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
      links: [pageFor(p)],
      suggestions: ["Lonavala meal plan", `Rooms in ${p.locality}`],
    };
  }
  return {
    text: [
      "Yes, food is available at every property:",
      "• Hotel Ravet: in-house restaurant, café and room service",
      "• Hotel Hinjewadi: in-house restaurant",
      `• Resort Lonavala: in-house dining, plus a villa meal plan at ${bySlug("resort-lonavala").mealPlan!.price} per person per villa stay`,
    ].join("\n"),
    suggestions: ["Lonavala meal plan", "Rooms"],
  };
}

function price(p?: Property): BotReply {
  const target = p ?? undefined;
  return {
    text: [
      "Room and villa rates depend on your dates and the number of guests, so the team shares them directly on enquiry. You pay zero booking-platform commission.",
      `The one published price is the Lonavala villa meal plan: ${bySlug("resort-lonavala").mealPlan!.price} per person per villa stay (hi-tea, dinner and breakfast).`,
    ].join("\n"),
    links: target ? [waFor(target, `Hello, could you share rates for ${target.name}?`), callFor(target)] : [primaryWa, { label: "Send an enquiry", href: "/#enquiry", kind: "page" }],
    suggestions: target ? [`Rooms in ${target.locality}`] : ["Rooms", "Lonavala meal plan"],
  };
}

function contact(p?: Property): BotReply {
  const list = p ? [p] : properties;
  return {
    text: [
      p ? `Contact ${p.name}:` : "You can reach each property directly:",
      ...list.flatMap((x) => (p ? [`• Phone / WhatsApp: ${x.phone.display}`, `• Email: ${x.email}`] : [`• ${x.shortName}: ${x.phone.display} · ${x.email}`])),
      "WhatsApp enquiries are open 24×7.",
    ].join("\n"),
    links: list.flatMap((x) => (p ? [waFor(x), callFor(x), { label: "Email", href: `mailto:${x.email}`, kind: "mail" as const }] : [waFor(x)])),
  };
}

function location(p?: Property): BotReply {
  const list = p ? [p] : properties;
  return {
    text: [
      p ? `${p.name} is at:` : "Our addresses:",
      ...list.map((x) => `• ${p ? "" : `${x.shortName}: `}${x.address.full}`),
      ...(p ? p.locationNotes.slice(0, 1) : []),
    ].join("\n"),
    links: list.map((x) => ({ label: `Map: ${x.shortName}`, href: x.mapUrl, external: true, kind: "map" as const })),
  };
}

function booking(p?: Property): BotReply {
  return {
    text: [
      "Booking is direct, with no middleman and zero commission:",
      "• WhatsApp the property (open 24×7)",
      "• Or call the property directly",
      "• Or fill in the enquiry form and we'll prepare the WhatsApp message for you",
    ].join("\n"),
    links: [p ? waFor(p) : primaryWa, { label: "Open enquiry form", href: "/#enquiry", kind: "page" }],
    suggestions: ["Contact numbers", "Rooms"],
  };
}

function celebration(): BotReply {
  const l = bySlug("resort-lonavala");
  return {
    text: `For celebrations, ${l.name} is ideal. It has a banquet hall, a garden and a shared swimming pool, alongside private 5 BHK and 3 BHK villas for the group to stay in. Share your date and guest count and the team will help plan it.`,
    links: [waFor(l, `Hello, I would like to plan a celebration at ${l.name}.`), pageFor(l)],
    suggestions: ["Lonavala meal plan", "Lonavala address"],
  };
}

function work(): BotReply {
  const h = bySlug("hotel-hinjewadi-phase-3-pune");
  const r = bySlug("hotel-ravet-pune");
  return {
    text: `For work trips, ${h.name} in Hinjewadi Phase 3 is business-friendly, with Wi-Fi, an in-house restaurant, laundry and a 24-hour reception. ${r.name} is another good base, with easy access to Hinjewadi and the expressway, plus a café and suites.`,
    links: [pageFor(h), pageFor(r)],
    suggestions: ["Hinjewadi rooms", "Ravet rooms"],
  };
}

function family(): BotReply {
  const l = bySlug("resort-lonavala");
  const r = bySlug("hotel-ravet-pune");
  return {
    text: `For family weekends, ${l.name} has private villas with a fully equipped kitchen, indoor games, a garden and a shared pool. In the city, ${r.name} offers suites and studio apartments with more room to spread out.`,
    links: [pageFor(l), pageFor(r)],
    suggestions: ["Lonavala villas", "Lonavala meal plan"],
  };
}

function policy(p?: Property): BotReply {
  const target = p;
  return {
    text: "I don't have published details on that. Timings and house policies are confirmed by the property team, who usually reply quickly on WhatsApp.",
    links: [target ? waFor(target, `Hello, I have a question about a stay at ${target.name}.`) : primaryWa],
    suggestions: ["Contact numbers", "How do I book?"],
  };
}

export const starters = [
  "Show me all properties",
  "Private villas in Lonavala",
  "Rooms at Hotel Ravet",
  "Is there a swimming pool?",
  "Lonavala meal plan price",
  "Plan a birthday celebration",
  "How do I book directly?",
  "Contact numbers",
];

export const welcome: BotReply = {
  text: "Namaste! Welcome to The Tree. I can help you choose between our hotels in Ravet and Hinjewadi Phase 3 and our private-villa resort in Lonavala — rooms, food, amenities, celebrations and direct booking. What would you like to know?",
  suggestions: starters,
};

/* ---------- router ---------- */

export function reply(input: string, ctx: ChatContext): { reply: BotReply; ctx: ChatContext } {
  const text = normalize(input);
  const has = matcher(text);

  // Which property is being discussed? Explicit mention wins over remembered context.
  const mentioned = propertyKeywords.filter(([kws]) => kws.some(has)).map(([, slug]) => slug);
  const puneOnly = has("pune") && mentioned.length === 0;
  const slug = mentioned.length === 1 ? mentioned[0] : mentioned.length > 1 || puneOnly ? undefined : ctx.propertySlug;
  const p = slug ? bySlug(slug) : undefined;
  const nextCtx: ChatContext = { propertySlug: mentioned.length === 1 ? mentioned[0] : mentioned.length > 1 ? undefined : ctx.propertySlug };

  if (!text) return { reply: welcome, ctx };

  let best: IntentId | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keywords.filter(has).length;
    if (score > bestScore) {
      best = intent.id;
      bestScore = score;
    }
  }

  // Price questions about food go to the meal plan.
  if (best === "price" && intents.find((i) => i.id === "meal")!.keywords.some(has)) best = "meal";
  // "Lonavala me kya hai?" style questions with only a property name.
  if (!best && mentioned.length === 1) {
    return {
      reply: {
        text: `${p!.name}, ${p!.cityLabel}. ${p!.summary}`,
        links: [pageFor(p!), waFor(p!)],
        suggestions: [`Rooms in ${p!.locality}`, `${p!.shortName} amenities`, `${p!.shortName} address`],
      },
      ctx: nextCtx,
    };
  }
  if (puneOnly && (!best || best === "overview")) {
    const pune = properties.filter((x) => x.destination === "pune");
    return {
      reply: {
        text: ["Our two Pune hotels:", ...pune.map((x) => `• ${x.name}: ${x.tagline}`)].join("\n"),
        links: [{ label: "Hotels in Pune", href: "/destinations/pune", kind: "page" }, ...pune.map(pageFor)],
        suggestions: ["Ravet rooms", "Hinjewadi rooms"],
      },
      ctx: nextCtx,
    };
  }

  const pick = (intent: IntentId | null): BotReply => {
    switch (intent) {
      case "greeting":
        return welcome;
      case "thanks":
        return { text: "You're welcome! Is there anything else I can help you plan?", suggestions: starters.slice(0, 4) };
      case "bye":
        return { text: "Thank you for visiting The Tree. We look forward to hosting you!", links: [primaryWa] };
      case "human":
        return {
          text: "Of course. You can speak to the property team directly on WhatsApp or by phone.",
          links: p ? [waFor(p), callFor(p)] : properties.map((x) => waFor(x)),
        };
      case "meal":
        return mealPlan();
      case "price":
        return price(p);
      case "amenity": {
        const key = amenityKeywords.find(([kws]) => kws.some(has))?.[1];
        return key ? amenity(key, p) : amenities(p);
      }
      case "rooms":
        return rooms(p);
      case "amenities":
        return amenities(p);
      case "food":
        return food(p);
      case "contact":
        return contact(p);
      case "location":
        return location(p);
      case "booking":
        return booking(p);
      case "celebration":
        return celebration();
      case "work":
        return work();
      case "family":
        return family();
      case "policy":
        return policy(p);
      case "overview":
        return p ? { text: `${p.name}, ${p.cityLabel}. ${p.summary}`, links: [pageFor(p), waFor(p)], suggestions: [`Rooms in ${p.locality}`, `${p.shortName} amenities`] } : overview();
      default:
        return {
          text: "I'm not sure about that one. I can help with properties, rooms, amenities, food, prices, locations and booking. For anything else, the team is a WhatsApp message away.",
          links: [primaryWa],
          suggestions: starters,
        };
    }
  };

  return { reply: pick(best), ctx: nextCtx };
}
