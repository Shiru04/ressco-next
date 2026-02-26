export const BUSINESS = {
  name: "RESSCO Metals, Inc.",

  // Contact (screenshot)
  phoneDisplay: "(562) 633-7047",
  phoneE164: "+15626337047",
  phone: "+15626337047",
  email: "sales@resscometals.com",

  address: {
    street: "1254 N Knollwood Cir",
    city: "Anaheim",
    state: "CA",
    zip: "92801",
  },

  addressText: "1254 N Knollwood Cir, Anaheim, CA 92801",

  hoursShort: "Mon–Fri 6:00 am – 4:00 pm",
  hoursLong: ["Mon–Fri: 6:00 am – 4:00 pm", "Sat: CLOSED", "Sun: CLOSED"],

  socials: [] as string[],
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/product-categories", label: "Products" },
  { href: "/contact", label: "Contact" },
] as const;
