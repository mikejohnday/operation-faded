/**
 * Single typed source of truth for all homepage copy and structured content.
 * Every fact here traces back to docs/discovery.md or docs/brief.md — see
 * build plan §5 for the rules this file is designed to make structurally
 * impossible to violate (no Beard Trim price, no combined review number,
 * no invented FADED25 eligibility, no team members beyond Elliot & Bailey).
 */

export const urls = {
  squireBooking: "https://getsquire.com/booking/book/faded-barbers-selby-selby",
  instagram: "https://www.instagram.com/fadedselby/",
} as const;

export const business = {
  name: "Faded Barbers Selby",
  addressLine1: "50 Micklegate",
  addressLine2: "Selby YO8 4EQ",
  phone: "07960 614359",
  phoneHref: "tel:+447960614359",
  // Verbatim from discovery §2 — deliberately not converted into precise
  // per-day open/close times, since only partial hours are confirmed
  // (e.g. Saturday's opening time is known but not its closing time).
  // Inventing the missing half of any pair would violate the "no invented
  // business facts" rule, so hours are presented as these confirmed lines
  // only, in both the footer and (see app/layout.tsx) structured data.
  hours: [
    { days: "Tuesday – Wednesday", time: "See Squire for times" },
    { days: "Thursday – Friday", time: "Open late, until 8pm" },
    { days: "Saturday", time: "From 8am" },
    { days: "Monday & Sunday", time: "Closed" },
  ],
} as const;

export type TeamMember = {
  name: string;
  title: string;
  portrait: string;
  alt: string;
};

// Elliot and Bailey only — confirmed co-owners (discovery §2/§7). Jake, Josh,
// and Will are deliberately excluded: their current active status is an open
// question (discovery §16), and the brief gives no confirmed roster beyond
// the two owners.
export const team: TeamMember[] = [
  {
    name: "Elliot",
    title: "Co-Owner",
    portrait: "/images/team/elliot.webp",
    alt: "Elliot, co-owner, cutting a client's hair at Faded Barbers Selby",
  },
  {
    name: "Bailey",
    title: "Co-Owner",
    portrait: "/images/team/bailey.webp",
    alt: "Bailey, co-owner, cutting a client's hair at Faded Barbers Selby",
  },
];

export type Service = {
  name: string;
  price: string;
};

// Only services with a confirmed price from discovery §2. Beard Trim is
// omitted entirely — its price is disputed (£10 vs £15) and not guessed.
// "One Grade All Over" and "Skinfade Back & Sides" (named in Faded's own
// services graphic) have no confirmed price anywhere in discovery, so they
// are omitted for the same reason.
export const services: Service[] = [
  { name: "Men's Cut", price: "£17" },
  { name: "Men's Cut & Beard", price: "£22" },
  { name: "Skinfade", price: "£20" },
  { name: "Skinfade & Beard", price: "£25" },
  { name: "Kid's Cut", price: "£15" },
  { name: "Kid's Skinfade", price: "£18" },
  { name: "OAP", price: "£10" },
];

export const reviews = {
  // Two separate, platform-labelled figures (discovery §11) — never summed
  // or averaged into one number.
  google: { rating: 5.0, count: 23, label: "Google" },
  squire: { rating: 5.0, count: 85, label: "Squire" },
  // Real, verbatim quote from Faded's own review-graphic post.
  quote:
    "Best barbers I've been to! Always leave extremely happy with the service that is consistently done to a high standard. The lads are really friendly and give the place a great atmosphere, which is why I would recommend Faded Barbers to anyone looking for a haircut.",
} as const;

export const offer = {
  code: "FADED25",
  // Split out for the oversized-numeral graphic treatment — same fact
  // ("25% off your haircut"), just structured so the percentage can carry
  // more visual weight without string-parsing a single headline.
  percentage: "25%",
  headlineRest: "off your haircut",
  description: "Book with the team via Squire and use the code at checkout.",
  // Deliberately neutral — discovery §11 found genuinely conflicting
  // eligibility wording across Faded's own posts. This prototype does not
  // resolve that conflict on Faded's behalf (brief §8).
  eligibilityText: "Ask in-shop or check current terms on booking.",
} as const;

export const hero = {
  // "Get faded." is Faded's own bio line. Uppercased for the refinement
  // pass to test whether it reads closer to Faded's own bold condensed
  // graphic language — still the same real phrase, not invented (brief §6).
  headline: "GET FADED.",
  // The "step away from the noise" theme — an emerging, not yet confirmed,
  // brand pillar (discovery §7) — tested here as a secondary supporting
  // line, exactly as brief §6 suggests. Copy unchanged from V1; only its
  // visual scale/placement was revisited in the refinement pass.
  supporting: "Step away from the noise. Sit back, switch off, and let the team take care of the rest.",
} as const;

export const instagramHandle = "@fadedselby";
