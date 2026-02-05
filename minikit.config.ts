const ROOT_URL = process.env.NEXT_PUBLIC_URL || "https://base-calc-miniapp.vercel.app/";

export const minikitConfig = {
  accountAssociation: {
    // Generate these at https://www.base.dev/preview?tab=account
    header: "eyJmaWQiOjU0NDI4NiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDJCQzY4QkQyMmM2YUY2MzM1N0ZCNkY4NDY5YTljMEQyMTM0Y2M0NzEifQ",
    payload: "eyJkb21haW4iOiJiYXNlLWNhbGMtbWluaWFwcC52ZXJjZWwuYXBwIn0",
    signature: "TbW7WpxnCtyO9xXLqN+3G8VZ2sGsSJw2ufcgN9aM6J8nhuFbgSUJNN38P2md2P/DUemFGtFFimIIEEyqrpScwRw=",
  },
  miniapp: {
    version: "1",
    name: "Base Calculator",
    subtitle: "Calculate with history",
    description: "A simple calculator with history for Base Mini Apps",
    screenshotUrls: [`${ROOT_URL}/screenshots/calculator.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#18181b",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "utility",
    tags: ["calculator", "math", "utility", "tools"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Simple calculator with history",
    ogTitle: "Base Calculator",
    ogDescription: "A simple calculator with history - Base Mini App",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;

export type MinikitConfig = typeof minikitConfig;
