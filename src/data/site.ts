export const DOMAIN = "flatfeehomesexchange.com";
export const EMAIL = "erg@flatfeehomesexchange.com";
export const BRAND = "Flat Fee Homes Exchange";
export const HERO_IMAGE =
  "https://imagedelivery.net/-sPAUAWeA405NiWJ0SNIQA/fa80d9b7-06c8-495e-5d88-41b172906600/public";

/** Set a whole-dollar asking price to publish Buy Now. Null keeps "on request". */
export const ASKING_PRICE: number | null = null;

export const META = {
  title: `${DOMAIN} | Premium Domain for Sale | ${BRAND}`,
  description:
    "flatfeehomesexchange.com is available from the owner. A premium .com for a flat-fee brokerage, home exchange, or FSBO brand. Make an offer. Transfer through Escrow.com.",
};

export type Category = "all" | "brokerage" | "exchange" | "investor" | "brand";

export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All fits" },
  { id: "brokerage", label: "Brokerage" },
  { id: "exchange", label: "Exchange" },
  { id: "investor", label: "Investor" },
  { id: "brand", label: "Brandable" },
];

export const useCases: {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  text: string;
  keywords: string[];
}[] = [
  {
    id: "brokerage",
    category: "brokerage",
    title: "Flat-fee listing desk",
    text: "A consumer brand for sellers who want a published fee instead of a percentage of the sale.",
    keywords: ["flat fee", "broker", "listing", "fsbo", "realty"],
  },
  {
    id: "fsbo",
    category: "brokerage",
    title: "Owner-listing marketplace",
    text: "Owners publish a home, pay one fee, and skip the commission conversation entirely.",
    keywords: ["fsbo", "owner", "listing", "marketplace", "homes"],
  },
  {
    id: "swap",
    category: "exchange",
    title: "Home exchange club",
    text: "Members trade time in each other's houses. The name states the product in four words.",
    keywords: ["exchange", "swap", "travel", "homes", "club"],
  },
  {
    id: "relocation",
    category: "exchange",
    title: "Relocation swap",
    text: "A service that matches households moving in opposite directions and coordinates the handoff.",
    keywords: ["relocation", "exchange", "move", "homes"],
  },
  {
    id: "investors",
    category: "investor",
    title: "Small-landlord trade desk",
    text: "Off-market exchanges between investors, with a fixed coordination fee instead of a spread.",
    keywords: ["investor", "landlord", "portfolio", "exchange"],
  },
  {
    id: "proptech",
    category: "brand",
    title: "Proptech product name",
    text: "Literal keywords match how people already search: flat fee, homes, and exchange.",
    keywords: ["brand", "proptech", "startup", "com"],
  },
];

export const specs = [
  { label: "Letters", value: "20" },
  { label: "Words", value: "4" },
  { label: "Extension", value: ".com" },
  { label: "Hyphen", value: "None" },
  { label: "Numbers", value: "None" },
  { label: "Language", value: "English" },
];

export const steps = [
  {
    n: "01",
    title: "Write the owner",
    text: "Send an offer or a question. You reach the registrant, not a lead form that gets resold.",
  },
  {
    n: "02",
    title: "Agree the number",
    text: "Price, timing, and who pays the escrow fee are settled in writing before anyone pays.",
  },
  {
    n: "03",
    title: "Open escrow",
    text: "Use Escrow.com or another independent escrow both sides accept. Funds stay there until the name moves.",
  },
  {
    n: "04",
    title: "Transfer the name",
    text: "Auth code, registrar push, or account change. You confirm control, then escrow releases payment.",
  },
];

export const included = [
  "The domain registration for flatfeehomesexchange.com",
  "A standard registrar transfer or push, at your direction",
  "Owner cooperation through escrow until you control the name",
];

export const excluded = [
  "A business, brand trademark, website codebase, or customer list",
  "A brokerage license, MLS access, or permission to practice real estate",
  "Traffic, revenue, or ranking guarantees",
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Is flatfeehomesexchange.com actually for sale?",
    a: "Yes. The name is available from the owner. This site is the inquiry desk for that acquisition. It is not a brokerage and it does not operate a home exchange.",
  },
  {
    q: "What is the price?",
    a: "The asking price is on request until a Buy Now figure is published on the home page. Send a number you can close. Serious, funded offers get a direct reply. Any published figure is for the domain name only.",
  },
  {
    q: "How do I pay?",
    a: "Do not wire the owner directly. Open a domain transaction at an independent escrow service such as Escrow.com. You pay escrow. The name transfers. Escrow releases the funds.",
  },
  {
    q: "What do I receive?",
    a: "Only the domain. No company, no trademark, no product, and no customers come with the name unless a separate written agreement says so.",
  },
  {
    q: "How long does a transfer take?",
    a: "A registrar push can be same day. An auth-code transfer between registrars often finishes inside a few days, and ICANN rules allow up to five days. Escrow holds payment until you confirm control.",
  },
  {
    q: "Can I make an offer below a number I have in mind?",
    a: "Yes. Say what you will actually pay and when. A one-line lowball with no context is easy to ignore. A short note about the brand you will build is not.",
  },
  {
    q: "Is there a payment plan?",
    a: "Not by default. If you need a short escrow hold while a company is formed, say so in the first note. Leases and installment sales are not offered.",
  },
  {
    q: "Will you build the website for me?",
    a: "No. The sale is the domain. What you see here is a sales page for the name, not a product you are buying the rights to operate.",
  },
];

export type Guide = {
  slug: string;
  title: string;
  description: string;
  minutes: number;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const guides: Guide[] = [
  {
    slug: "check-before-you-buy",
    title: "What to check before you buy a brandable .com",
    description:
      "A short diligence list for flatfeehomesexchange.com and any other descriptive domain: trademark, meaning, transfer, and the story you will have to tell customers.",
    minutes: 6,
    updated: "2026-09-29",
    sections: [
      {
        heading: "Say it out loud",
        paragraphs: [
          "If a receptionist cannot spell the name after hearing it once, you will pay for that forever in email and radio. flatfeehomesexchange.com is long, but every word is ordinary English. There is no invented syllable to correct.",
          "Length is a trade. Twenty letters will not be a ticker symbol. It will be obvious in a search result and on a yard sign. Decide which of those you are buying.",
        ],
      },
      {
        heading: "Search the words, not just the string",
        paragraphs: [
          "Look up “flat fee homes” and “home exchange” as phrases. You want a name that sits next to an existing demand, not a name that has to teach the market a new vocabulary.",
          "Then search the exact phrase in quotes with “trademark” and scan the USPTO database yourself, or have counsel do it. A domain registration is not a trademark. This page is not legal advice.",
        ],
      },
      {
        heading: "Confirm you can take delivery",
        paragraphs: [
          "Ask which registrar holds the name, whether a 60-day lock is in effect, and whether the transfer will be a push or an auth code. Those three facts tell you the calendar.",
          "Use escrow. The fee is boring. The alternative is paying a stranger and hoping the nameservers change.",
        ],
      },
    ],
  },
  {
    slug: "flat-fee-brand-names",
    title: "Why a flat-fee real estate brand should sound like the fee",
    description:
      "Percentage commissions are under pressure. The brands that win the explanation race put the pricing model in the name.",
    minutes: 5,
    updated: "2026-09-29",
    sections: [
      {
        heading: "The fee is the headline",
        paragraphs: [
          "Most brokerage sites spend the first screen apologizing for, or hiding, the commission. A flat-fee brand does the opposite. The price model is the product. Hiding it inside a cute coined name throws away the only advantage.",
          "flatfeehomesexchange.com spends its entire character budget on that sentence: flat fee, homes, exchange. A visitor does not need a tagline to guess the category.",
        ],
      },
      {
        heading: "Exchange is the flexible word",
        paragraphs: [
          "Exchange can mean a marketplace, a swap, or a trade between investors. That range is useful. You can launch as a listing desk and later add a member swap without renaming the company.",
          "It is also a constraint. If you later want to be a luxury concierge brokerage, this name will fight you. Buy it only if the plain-language model is the plan.",
        ],
      },
      {
        heading: "Where it works in the wild",
        paragraphs: [
          "The name fits a yard sign, a Google Business profile, and a spoken referral: “We used the flat fee homes exchange.” It is less suited to an app icon that has room for eight characters. Pair the long domain with a short product nickname if you ship a mobile app.",
        ],
      },
    ],
  },
  {
    slug: "how-escrow-transfer-works",
    title: "How a domain sale through escrow actually works",
    description:
      "The sequence both sides should expect: offer, agreement, escrow, transfer, release. No countdown clocks, no wire to a personal account.",
    minutes: 5,
    updated: "2026-09-29",
    sections: [
      {
        heading: "Agree before anyone pays",
        paragraphs: [
          "Write down the price, the currency, who pays the escrow fee, and the transfer method. One email thread is enough for a single domain. You do not need a 40-page asset purchase agreement unless lawyers on either side want one.",
          "State what is not included. For this name, that list is everything except the registration: no trademark, no code, no customers.",
        ],
      },
      {
        heading: "Escrow is the neutral drawer",
        paragraphs: [
          "The buyer pays Escrow.com or a similar service, not the seller’s personal account. Escrow tells the seller that funds are secured. The seller starts the transfer. The buyer confirms the name is in an account they control. Escrow pays the seller.",
          "If either side goes quiet, the money is still in the drawer. That is the entire point.",
        ],
      },
      {
        heading: "Transfer mechanics",
        paragraphs: [
          "A push keeps the name at the same registrar and can be the same day. An auth-code transfer moves it to the buyer’s registrar. The buyer should say which they want in the first reply.",
          "After the transfer, update the lock, DNSSEC, and contact email immediately. The sales page you are reading does not stay part of the deal.",
        ],
      },
    ],
  },
];

export function money(amount: number | null): string {
  if (amount == null) return "On request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function mailtoInquiry(fields: {
  name: string;
  email: string;
  amount: string;
  message: string;
  intent: string;
}): string {
  const subject = `Domain inquiry: ${DOMAIN} (${fields.intent})`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Offer USD: ${fields.amount || "not specified"}`,
    `Intent: ${fields.intent}`,
    "",
    fields.message || "(no message)",
  ].join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
