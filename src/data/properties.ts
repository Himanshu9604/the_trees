export type PropertyType = "Hotel" | "Villa";
export type DestinationSlug = "pune" | "lonavala";

export type AmenityKey =
  | "restaurant"
  | "cafe"
  | "wifi"
  | "ac"
  | "parking"
  | "room-service"
  | "tv"
  | "intercom"
  | "laundry"
  | "reception"
  | "garden"
  | "banquet"
  | "pool"
  | "indoor-games"
  | "kitchen";

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RoomType {
  name: string;
  units: number;
  note: string;
}

export interface MealPlan {
  price: string;
  basis: string;
  courses: { title: string; items: string[] }[];
  notes: string[];
}

export interface Property {
  slug: string;
  legacySlug: string;
  name: string;
  shortName: string;
  type: PropertyType;
  schemaType: "Hotel" | "Resort";
  destination: DestinationSlug;
  locality: string;
  cityLabel: string;
  address: {
    street?: string;
    locality: string;
    region: string;
    postalCode?: string;
    country: "IN";
    full: string;
  };
  geo?: { lat: number; lng: number };
  mapUrl: string;
  tagline: string;
  summary: string;
  description: string[];
  locationNotes: string[];
  bestFor: string[];
  rooms: RoomType[];
  amenities: AmenityKey[];
  phone: { display: string; tel: string };
  whatsapp: string;
  email: string;
  heroImage: PropertyImage;
  gallery: PropertyImage[];
  mealPlan?: MealPlan;
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
}

const img = (src: string, alt: string, width: number, height: number): PropertyImage => ({
  src,
  alt,
  width,
  height,
});

export const amenityLabels: Record<AmenityKey, string> = {
  restaurant: "In-house restaurant",
  cafe: "Café",
  wifi: "Wi-Fi",
  ac: "Air conditioning",
  parking: "Parking",
  "room-service": "Room service",
  tv: "TV",
  intercom: "Intercom",
  laundry: "Laundry",
  reception: "24-hour reception",
  garden: "Garden",
  banquet: "Banquet hall",
  pool: "Shared swimming pool",
  "indoor-games": "Indoor games",
  kitchen: "Fully equipped kitchen",
};

export const properties: Property[] = [
  {
    slug: "hotel-ravet-pune",
    legacySlug: "ravet",
    name: "The Tree Hotel Ravet",
    shortName: "Hotel Ravet",
    type: "Hotel",
    schemaType: "Hotel",
    destination: "pune",
    locality: "Ravet",
    cityLabel: "Ravet, Pune",
    address: {
      locality: "Ravet, Pune",
      region: "Maharashtra",
      country: "IN",
      full: "Ravet, Pune, Maharashtra",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Tree%20Hotel%20Ravet%2C%20Ravet%2C%20Pune%2C%20Maharashtra",
    tagline: "City comfort with an in-house restaurant & café",
    summary:
      "A calm, comfortable city stay in Ravet with easy access to Hinjewadi and the expressway, plus an in-house restaurant and café.",
    description: [
      "The Tree Hotel Ravet is our city address in Pune — a calm, comfortable base for business trips, family visits and short urban breaks. Rooms are bright and freshly finished, with work desks, air conditioning and Wi-Fi throughout.",
      "Choose from four room styles: the Super Duplex, Deluxe, Studio Apartment and Suite. Guests can dine at the in-house restaurant, unwind at the café, or order to the room with room service.",
    ],
    locationNotes: [
      "Ravet sits on the western side of Pune, with convenient reach to Hinjewadi and the Mumbai–Pune expressway.",
      "A practical choice when your plans take you across Pimpri-Chinchwad, Hinjewadi and the wider city.",
    ],
    bestFor: ["Business travel", "Family visits", "Longer city stays"],
    rooms: [
      { name: "Super Duplex Room", units: 3, note: "A duplex-style room for guests who like extra space." },
      { name: "Deluxe Room", units: 3, note: "A comfortable, well-appointed room for short or long stays." },
      { name: "Studio Apartment", units: 3, note: "An apartment-style option suited to extended stays." },
      { name: "Suite Room", units: 3, note: "A separate lounge area for guests who want more room to relax." },
    ],
    amenities: ["restaurant", "cafe", "wifi", "ac", "parking", "room-service"],
    phone: { display: "+91 93719 62999", tel: "+919371962999" },
    whatsapp: "919371962999",
    email: "hotelthetreeravet@gmail.com",
    heroImage: img(
      "/images/ravet/hero.jpg",
      "Exterior of The Tree Luxury Rooms building in Ravet, Pune, against a clear blue sky",
      1426,
      1103,
    ),
    gallery: [
      img("/images/ravet/gallary-2.jpg", "Suite lounge at The Tree Hotel Ravet with an orange sofa, patterned rug and cove lighting", 1600, 1200),
      img("/images/ravet/gallary-1.jpg", "Double room in Ravet with a floral arch mural, red curtains and a work desk", 1600, 1200),
      img("/images/ravet/gallary-8.jpg", "Twin-bed room with teal curtains and a botanical wall mural", 1600, 1200),
      img("/images/ravet/gallary-3.jpg", "Suite living area with sofa, TV unit and soft ceiling lighting", 1600, 1200),
      img("/images/ravet/gallary-11.jpg", "Bedroom with crisp white linen, green runner and floral mural", 1600, 1200),
      img("/images/ravet/gallary-7.jpg", "Room with wall-mounted TV, desk and red drapes", 1600, 1200),
      img("/images/ravet/gallary-10.jpg", "Double bed with plush headboard beside a floral mural", 1600, 1200),
      img("/images/ravet/gallary-13.jpg", "Bright double room with indoor plants and marble flooring", 1600, 1200),
      img("/images/ravet/gallary-16.jpg", "Bedroom with study desk and artistic arch mural", 1600, 1200),
      img("/images/ravet/gallary-5.jpg", "Work desk and wardrobe beside a large window with city views", 1600, 1200),
      img("/images/ravet/gallary-12.jpg", "Wide view of a guest room at The Tree Hotel Ravet", 1600, 641),
      img("/images/ravet/gallary-4.jpg", "Bathroom with stone-finish walls and modern fittings", 1200, 1600),
      img("/images/ravet/gallary-6.jpg", "Washbasin with geometric wall tiles", 1200, 1600),
    ],
    faqs: [
      {
        q: "What room types are available at The Tree Hotel Ravet?",
        a: "There are four room styles: Super Duplex Room, Deluxe Room, Studio Apartment and Suite Room. Call or WhatsApp the hotel to check which is available for your dates.",
      },
      {
        q: "Is food available at the Ravet hotel?",
        a: "Yes. The hotel has an in-house restaurant and a café, and room service is available.",
      },
      {
        q: "Is the hotel convenient for Hinjewadi?",
        a: "Ravet offers convenient reach to Hinjewadi and the expressway, which makes it a practical base for work trips in west Pune.",
      },
    ],
    seo: {
      title: "Hotel in Ravet, Pune — Rooms, Suites & Studio Apartments",
      description:
        "Stay at The Tree Hotel Ravet, Pune: Super Duplex, Deluxe, Studio Apartment and Suite rooms with an in-house restaurant, café, Wi-Fi and parking. Book direct on WhatsApp.",
    },
  },
  {
    slug: "hotel-hinjewadi-phase-3-pune",
    legacySlug: "hinjewadi-phase-3",
    name: "Hotel The Tree Hinjewadi",
    shortName: "Hotel Hinjewadi",
    type: "Hotel",
    schemaType: "Hotel",
    destination: "pune",
    locality: "Hinjewadi Phase 3",
    cityLabel: "Hinjewadi Phase 3, Pune",
    address: {
      locality: "Hinjewadi Phase 3, Pune",
      region: "Maharashtra",
      country: "IN",
      full: "Hinjewadi Phase 3, Pune, Maharashtra",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The%20Tree%20Hotel%20Hinjewadi%20Phase%203%2C%20Pune%2C%20Maharashtra",
    tagline: "A smart, stylish base for business and weekend stays",
    summary:
      "A business-friendly hotel in Hinjewadi Phase 3 with Deluxe and Super Deluxe rooms, an in-house restaurant and round-the-clock reception.",
    description: [
      "Hotel The Tree Hinjewadi is a smart, stylish base for business travellers and weekend stays in Hinjewadi Phase 3. Rooms are clean, quiet and practical, with air conditioning, TV, intercom and Wi-Fi.",
      "Choose between Deluxe and Super Deluxe rooms. The in-house restaurant keeps meals simple after a long day, laundry is on hand for longer stays, and the reception desk is open 24 hours.",
    ],
    locationNotes: [
      "Located in Hinjewadi Phase 3, the hotel is well placed for stays connected to Pune's IT and business district.",
      "With 24-hour reception, late arrivals and early departures are easy to manage.",
    ],
    bestFor: ["Business travellers", "Corporate stays", "Weekend stays"],
    rooms: [
      { name: "Deluxe Room", units: 12, note: "Comfortable double or twin layouts with everything you need for work or rest." },
      { name: "Super Deluxe Room", units: 12, note: "An upgraded room category for longer or more relaxed stays." },
    ],
    amenities: ["restaurant", "wifi", "tv", "intercom", "laundry", "reception", "ac"],
    phone: { display: "+91 91460 44999", tel: "+919146044999" },
    whatsapp: "919146044999",
    email: "Hotelthetree1@gmail.com",
    heroImage: img(
      "/images/hinjewadi-phase-3/hero.jpg",
      "Exterior of Hotel The Tree Hinjewadi in Hinjewadi Phase 3, Pune",
      1080,
      731,
    ),
    gallery: [
      img("/images/hinjewadi-phase-3/gallary-9.jpg", "Reception lobby of Hotel The Tree Hinjewadi with the illuminated tree logo", 1015, 728),
      img("/images/hinjewadi-phase-3/gallary-2.jpg", "Deluxe double room with a navy headboard and green accent runner", 1156, 867),
      img("/images/hinjewadi-phase-3/gallary-7.jpg", "In-house restaurant dining area with large windows", 1280, 720),
      img("/images/hinjewadi-phase-3/gallary-1.jpg", "Twin-bed room with crisp white linen and green runners", 1156, 867),
      img("/images/hinjewadi-phase-3/gallary-5.jpg", "Super Deluxe room with panelled feature wall and wall sconces", 1038, 733),
      img("/images/hinjewadi-phase-3/gallary-6.jpg", "Twin room with blush headboards and framed wall panels", 1080, 773),
      img("/images/hinjewadi-phase-3/gallary-8.jpg", "Hotel building in Hinjewadi Phase 3 lit up at night", 1058, 773),
      img("/images/hinjewadi-phase-3/gallary-3.jpg", "Bright hotel corridor with marble flooring", 667, 815),
      img("/images/hinjewadi-phase-3/gallary-4.jpg", "Clean modern bathroom with grey tiles", 960, 1280),
    ],
    faqs: [
      {
        q: "Is the Hinjewadi hotel suitable for business travel?",
        a: "Yes. The hotel is designed as a business-friendly base, with Wi-Fi, an in-house restaurant, laundry and a 24-hour reception.",
      },
      {
        q: "Which rooms can I book in Hinjewadi Phase 3?",
        a: "You can choose between Deluxe and Super Deluxe rooms. Share your dates on WhatsApp for current availability.",
      },
      {
        q: "Can I check in late at night?",
        a: "The reception is open 24 hours. Let the team know your expected arrival time when you enquire.",
      },
    ],
    seo: {
      title: "Hotel near Hinjewadi Phase 3, Pune — Deluxe & Super Deluxe Rooms",
      description:
        "Hotel The Tree Hinjewadi in Hinjewadi Phase 3, Pune: Deluxe and Super Deluxe rooms, in-house restaurant, Wi-Fi, laundry and 24-hour reception. Enquire directly.",
    },
  },
  {
    slug: "resort-lonavala",
    legacySlug: "lonavala",
    name: "The Tree Resort Lonavala",
    shortName: "Resort Lonavala",
    type: "Villa",
    schemaType: "Resort",
    destination: "lonavala",
    locality: "Lonavala",
    cityLabel: "Lonavala, Maharashtra",
    address: {
      street: "Old Mumbai–Pune Highway, Behind Sant Tukaram Temple, Maval, Waksai",
      locality: "Lonavala",
      region: "Maharashtra",
      postalCode: "410403",
      country: "IN",
      full: "Old Mumbai–Pune Highway, Behind Sant Tukaram Temple, Maval, Waksai, Lonavala – 410403",
    },
    geo: { lat: 18.760408, lng: 73.4511174 },
    mapUrl: "https://www.google.com/maps/place/The+Tree+Resort+Lonavala/@18.760408,73.4511174,17z",
    tagline: "Private villas, a garden and a shared pool in the hills",
    summary:
      "A nature-led hillside resort for long weekends and celebrations, with private 3 BHK and 5 BHK villas, cottages, a garden, banquet hall and shared swimming pool.",
    description: [
      "The Tree Resort Lonavala is made for long weekends, celebrations and quiet mornings in the hills. Stay in a private 3 BHK or 5 BHK villa, or a cosy cottage, with a garden, banquet hall and shared swimming pool open to every guest.",
      "Villas come with a fully equipped kitchen and indoor games, so families and groups can settle in properly. In-house dining is available, including a villa meal plan with hi-tea, dinner and breakfast.",
    ],
    locationNotes: [
      "The resort is on the Old Mumbai–Pune Highway at Waksai, behind Sant Tukaram Temple, in Maval near Lonavala.",
      "An easy drive from both Pune and Mumbai, Lonavala is loved for its green hills, especially through the monsoon.",
    ],
    bestFor: ["Family weekends", "Celebrations", "Group getaways"],
    rooms: [
      { name: "Private 5 BHK Villa", units: 1, note: "Our largest private villa — ideal for big families and celebrations." },
      { name: "Private 3 BHK Villa", units: 2, note: "A private villa for families and friends travelling together." },
      { name: "Cottage", units: 4, note: "A cosy option for couples and small families." },
    ],
    amenities: ["wifi", "garden", "banquet", "pool", "indoor-games", "kitchen", "restaurant", "parking"],
    phone: { display: "+91 89750 53999", tel: "+918975053999" },
    whatsapp: "918975053999",
    email: "thetreeresortlonavala@gmail.com",
    heroImage: img(
      "/images/lonavala/hero.jpg",
      "The Tree Resort Lonavala at night, with lit villa balconies reflected in the swimming pool",
      1556,
      1168,
    ),
    gallery: [
      img("/images/lonavala/gallery-5.jpg", "Poolside gazebo dining area at The Tree Resort Lonavala, lit up at night", 1556, 1168),
      img("/images/lonavala/gallery-11.jpg", "Villa living room with wooden sofas, artwork and TV", 1556, 1168),
      img("/images/lonavala/gallery-1.jpg", "Four-poster villa bed with colourful cushions and a carved wooden bench", 1556, 1168),
      img("/images/lonavala/gallery-13.jpg", "Fully equipped villa kitchen with teal cabinets and stone counter", 1556, 1168),
      img("/images/lonavala/gallery-10.jpg", "Bedroom with four-poster bed and balcony doors", 1556, 1168),
      img("/images/lonavala/gallery-3.jpg", "Kitchen counter and lounge seating in a villa at night", 1280, 960),
      img("/images/lonavala/gallery-7.jpg", "Dining table set with fresh flowers against mauve curtains", 1556, 1168),
      img("/images/lonavala/gallery-4.jpg", "Canopy bed dressed with sheer white drapes", 1556, 1168),
      img("/images/lonavala/gallery-8.jpg", "Draped reading nook with a wooden armchair", 1556, 1168),
      img("/images/lonavala/gallery-2.jpg", "Tea and coffee station with kettle and glassware", 1280, 960),
      img("/images/lonavala/gallery-9.jpg", "Villa bathroom with rain shower and wooden door", 1600, 1200),
      img("/images/lonavala/gallery-12.jpg", "Bathroom with stone-finish walls and vessel basin", 1049, 810),
    ],
    mealPlan: {
      price: "₹1,499",
      basis: "per person, per villa stay",
      courses: [
        { title: "Hi-Tea", items: ["Sandwich or Pakoda", "Tea & Coffee"] },
        {
          title: "Dinner",
          items: [
            "2 Starters",
            "Dum Aloo or Paneer Masala",
            "Mix Veg Mushroom",
            "Dal Tadka",
            "Jeera Rice",
            "Chapati",
            "Gulab Jamun",
            "Papad, Salad & Chaas",
          ],
        },
        { title: "Breakfast", items: ["Poha", "Upma", "Bread Butter Jam", "Tea & Coffee"] },
      ],
      notes: ["Lunch is decided separately on the day.", "Extra vegetable choices: ₹300."],
    },
    faqs: [
      {
        q: "What stays are available at The Tree Resort Lonavala?",
        a: "You can book a private 5 BHK villa, a private 3 BHK villa or a cottage. All guests can use the garden, banquet hall and shared swimming pool.",
      },
      {
        q: "Is there a meal plan for villa guests?",
        a: "Yes. The villa meal plan is ₹1,499 per person per villa stay and includes hi-tea, dinner and breakfast. Lunch is decided separately on the day, and extra vegetable choices are ₹300.",
      },
      {
        q: "Can we host a celebration at the Lonavala resort?",
        a: "The resort has a banquet hall and garden that suit birthdays, anniversaries and family gatherings. Share your plans on WhatsApp and the team will help you arrange it.",
      },
      {
        q: "Where exactly is the resort?",
        a: "Old Mumbai–Pune Highway, Behind Sant Tukaram Temple, Maval, Waksai, Lonavala – 410403.",
      },
    ],
    seo: {
      title: "Resort in Lonavala with Private Villas & Pool — The Tree Resort",
      description:
        "Private 3 BHK and 5 BHK villas and cottages in Lonavala with a garden, banquet hall, shared pool and meal plan. Ideal for family stays and celebrations. Enquire on WhatsApp.",
    },
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesByDestination(destination: DestinationSlug) {
  return properties.filter((p) => p.destination === destination);
}

export function propertyHref(p: Pick<Property, "slug">) {
  return `/properties/${p.slug}`;
}
