import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MiniKitProvider } from "@/providers/MiniKitProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_URL || "https://your-domain.vercel.app";

export const metadata: Metadata = {
  title: "Base Calculator",
  description: "A simple calculator with history - Base Mini App",
  openGraph: {
    title: "Base Calculator",
    description: "A simple calculator with history - Base Mini App",
    url: appUrl,
    siteName: "Base Calculator",
    images: [
      {
        url: `${appUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Base Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${appUrl}/og-image.png`,
      button: {
        title: "Open Calculator",
        action: {
          type: "launch_frame",
          name: "Base Calculator",
          url: appUrl,
          splashImageUrl: `${appUrl}/splash.png`,
          splashBackgroundColor: "#0052FF",
        },
      },
    }),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}
