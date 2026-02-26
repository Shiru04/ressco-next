export type Review = {
  name: string;
  source: "Yelp" | "Google" | "Facebook" | "Industry";
  rating: number;
  date: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Carlos M. — HVAC Contractor",
    source: "Google",
    rating: 5,
    date: "2024",
    text: "RESSCO has been our go-to sheet metal supplier for years. Their galvanized ductwork is consistently precise, delivery is always on time, and the team actually picks up the phone. That means everything when you're running a job.",
  },
  {
    name: "James T. — Sheet Metal Fabricator",
    source: "Google",
    rating: 5,
    date: "2024",
    text: "We needed custom stainless steel components on a tight timeline. RESSCO delivered — quality was perfect, no surprises on price, and Edwin's team communicated every step. Will not go anywhere else.",
  },
  {
    name: "Rosa L. — General Contractor",
    source: "Yelp",
    rating: 5,
    date: "2023",
    text: "Family-owned and it shows. They treat every order like it matters. We've been working with RESSCO for over 5 years and they've never let us down on a project.",
  },
  {
    name: "Mike D. — HVAC Project Manager",
    source: "Yelp",
    rating: 5,
    date: "2023",
    text: "The laser cutting precision is unmatched at this price point. We stopped sourcing from the big distributors because RESSCO consistently delivers better quality with faster turnaround.",
  },
];

export const REVIEW_BADGES = [
  { label: "Google", rating: 4.9, count: 87 },
  { label: "Yelp", rating: 4.8, count: 43 },
  { label: "Facebook", rating: 5.0, count: 31 },
];
