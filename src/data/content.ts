import type { DestinationSlug } from "./properties";

export interface Destination {
  slug: DestinationSlug;
  name: string;
  region: string;
  eyebrow: string;
  headline: string;
  intro: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  seo: { title: string; description: string };
}

export const destinations: Destination[] = [
  {
    slug: "pune",
    name: "Pune",
    region: "Ravet & Hinjewadi Phase 3",
    eyebrow: "City stays",
    headline: "Hotels in Pune — Ravet & Hinjewadi Phase 3",
    intro:
      "Two owner-run city hotels on Pune's western side, close to the business district of Hinjewadi and the Mumbai–Pune expressway.",
    paragraphs: [
      "Our Pune hotels are built around the way people actually travel to the west of the city — for work, for family, and for stays that stretch across a few days. Both hotels have in-house dining, air-conditioned rooms and Wi-Fi, and both are reachable directly by phone or WhatsApp.",
      "Choose Ravet if you want a wider choice of room styles — including a Super Duplex, Studio Apartment and Suite — plus a café on site. Choose Hinjewadi Phase 3 if your days are centred on the IT and business district and you value a 24-hour reception.",
    ],
    image: {
      src: "/images/ravet/gallary-2.jpg",
      alt: "Suite lounge at The Tree Hotel Ravet in Pune with sofa and warm lighting",
    },
    seo: {
      title: "Hotels in Pune — Ravet & Hinjewadi Phase 3",
      description:
        "Compare The Tree's two Pune hotels: Hotel Ravet with suites, studio apartments and a café, and Hotel Hinjewadi Phase 3 with 24-hour reception. Book direct.",
    },
  },
  {
    slug: "lonavala",
    name: "Lonavala",
    region: "Waksai, Maval",
    eyebrow: "Hill retreat",
    headline: "Private Villa Resort in Lonavala",
    intro:
      "A hillside resort near Lonavala with private 3 BHK and 5 BHK villas, cottages, a garden, banquet hall and shared swimming pool.",
    paragraphs: [
      "Lonavala is the classic weekend escape between Pune and Mumbai — green hills, cool evenings and dramatic monsoon views. The Tree Resort Lonavala sits on the Old Mumbai–Pune Highway at Waksai, behind Sant Tukaram Temple.",
      "It is designed for families and groups who want space of their own: private villas with fully equipped kitchens and indoor games, a garden for slow afternoons, and a banquet hall for birthdays, anniversaries and get-togethers. A villa meal plan covers hi-tea, dinner and breakfast.",
    ],
    image: {
      src: "/images/lonavala/gallery-5.jpg",
      alt: "Poolside gazebo at The Tree Resort Lonavala lit with warm string lights",
    },
    seo: {
      title: "Villas & Resort in Lonavala for Families and Celebrations",
      description:
        "The Tree Resort Lonavala: private 3 BHK and 5 BHK villas and cottages with a shared pool, garden and banquet hall at Waksai, near Lonavala. Enquire on WhatsApp.",
    },
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}

export const stayPreferences = [
  {
    id: "work",
    label: "Work Trip",
    title: "Stay close to where the work is",
    copy: "Business-friendly rooms in west Pune with Wi-Fi, in-house dining and easy access to Hinjewadi.",
    propertySlugs: ["hotel-hinjewadi-phase-3-pune", "hotel-ravet-pune"],
  },
  {
    id: "family",
    label: "Family Weekend",
    title: "Room for everyone to unwind",
    copy: "Private villas with kitchens and indoor games in the hills, or spacious suites and studio apartments in the city.",
    propertySlugs: ["resort-lonavala", "hotel-ravet-pune"],
  },
  {
    id: "celebration",
    label: "Celebrations & Getaways",
    title: "Gather, celebrate, stay the night",
    copy: "A banquet hall, garden and shared pool beside private villas — made for birthdays, anniversaries and group getaways.",
    propertySlugs: ["resort-lonavala"],
  },
] as const;

export const experiences = [
  {
    title: "Private Villas & Garden",
    copy: "3 BHK and 5 BHK villas with their own kitchen and living spaces, opening onto a peaceful garden.",
    image: { src: "/images/lonavala/gallery-11.jpg", alt: "Villa living room at The Tree Resort Lonavala" },
    href: "/properties/resort-lonavala",
  },
  {
    title: "In-House Restaurant & Café",
    copy: "Home-style meals at our Pune hotels, with a café at Ravet for slow coffees and quick bites.",
    image: { src: "/images/hinjewadi-phase-3/gallary-7.jpg", alt: "Restaurant dining area at Hotel The Tree Hinjewadi" },
    href: "/properties/hotel-hinjewadi-phase-3-pune",
  },
  {
    title: "Banquet Hall & Celebrations",
    copy: "Host birthdays, anniversaries and family gatherings at the Lonavala resort's banquet hall and garden.",
    image: { src: "/images/lonavala/gallery-5.jpg", alt: "Poolside gazebo seating at The Tree Resort Lonavala" },
    href: "/properties/resort-lonavala",
  },
  {
    title: "Spacious Suite Rooms",
    copy: "Suites, Super Duplex rooms and Studio Apartments in Ravet for stays that need a little more room.",
    image: { src: "/images/ravet/gallary-3.jpg", alt: "Suite living area at The Tree Hotel Ravet" },
    href: "/properties/hotel-ravet-pune",
  },
  {
    title: "Shared Swimming Pool",
    copy: "Evenings by the pool, under the lights, steps away from your villa in Lonavala.",
    image: { src: "/images/lonavala/hero.jpg", alt: "Swimming pool at The Tree Resort Lonavala at night" },
    href: "/properties/resort-lonavala",
  },
] as const;

export const whyChoose = [
  { title: "Premium Comfort", copy: "Freshly finished rooms and villas with clean linen, air conditioning and Wi-Fi." },
  { title: "Personalised Stays", copy: "Owner-run properties, so your requests reach the people who can say yes." },
  { title: "Thoughtful Hospitality", copy: "Warm, attentive service — from check-in to the last cup of chai." },
  { title: "Always Reachable", copy: "Enquire 24×7 on WhatsApp, or call the property directly." },
  { title: "Three Signature Destinations", copy: "Ravet and Hinjewadi Phase 3 in Pune, and a villa resort in Lonavala." },
  { title: "In-house Dining", copy: "Restaurants at every property, a café at Ravet and a villa meal plan in Lonavala." },
] as const;

export const dining = [
  { title: "Breakfast", copy: "Start the day with poha, upma, toast and fresh tea or coffee." },
  { title: "All-day dining", copy: "In-house restaurants serve comforting, home-style meals." },
  { title: "Celebrations", copy: "Birthdays and anniversaries, planned around the banquet hall and garden." },
  { title: "Gatherings", copy: "Family get-togethers and group meals, arranged with the property team." },
] as const;

// Verbatim from the original website.
export const testimonials = [
  {
    name: "Rohan & Priya",
    property: "The Tree Lonavala",
    propertySlug: "resort-lonavala",
    quote:
      "Our weekend in Lonavala felt unhurried — room to breathe, a private pool, great food and a view worth waking up early for.",
  },
  {
    name: "Aditya Sharma",
    property: "The Tree Ravet",
    propertySlug: "hotel-ravet-pune",
    quote: "A comfortable base for exploring Pune, with a calm setting to come back to after a busy day.",
  },
  {
    name: "Neha Kulkarni",
    property: "The Tree Hinjewadi Phase 3",
    propertySlug: "hotel-hinjewadi-phase-3-pune",
    quote: "A convenient stay for work and a genuinely comfortable place to slow down between meetings.",
  },
] as const;

export const generalFaqs = [
  {
    q: "Which locations does The Tree have properties in?",
    a: "We have three properties: Hotel Ravet and Hotel Hinjewadi Phase 3, both in Pune, and Resort Lonavala, a private-villa hill resort near Lonavala.",
  },
  {
    q: "Can I book directly without paying a booking-platform commission?",
    a: "Yes. Call or WhatsApp the property directly — there is no booking middleman, so you pay zero platform commission.",
  },
  {
    q: "What kind of rooms or stays are available?",
    a: "Ravet offers Super Duplex, Deluxe, Studio Apartment and Suite rooms. Hinjewadi Phase 3 offers Deluxe and Super Deluxe rooms. Lonavala offers private 5 BHK and 3 BHK villas and cottages.",
  },
  {
    q: "Is food available at the properties?",
    a: "Yes. Ravet has an in-house restaurant and café, Hinjewadi Phase 3 has an in-house restaurant, and Lonavala offers in-house dining with a villa meal plan of ₹1,499 per person per villa stay covering hi-tea, dinner and breakfast.",
  },
  {
    q: "Can I host an event or celebration at one of the properties?",
    a: "Our Lonavala resort has a banquet hall, garden and shared pool, which suit birthdays, anniversaries and family gatherings. Share your plans on WhatsApp to arrange the details.",
  },
  {
    q: "How quickly can I get a response to my enquiry?",
    a: "WhatsApp enquiries are open 24×7. Message the property you are interested in and the team will get back to you with availability and rates.",
  },
] as const;
