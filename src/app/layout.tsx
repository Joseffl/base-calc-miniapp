import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MiniKitProvider } from "@/providers/MiniKitProvider";
import { minikitConfig } from "../../minikit.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { miniapp } = minikitConfig;

export const metadata: Metadata = {
  title: miniapp.name,
  description: miniapp.description,
  openGraph: {
    title: miniapp.ogTitle || miniapp.name,
    description: miniapp.ogDescription || miniapp.description,
    url: miniapp.homeUrl,
    siteName: miniapp.name,
    images: [
      {
        url: miniapp.ogImageUrl,
        width: 1200,
        height: 630,
        alt: miniapp.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: miniapp.ogImageUrl,
      button: {
        title: `Open ${miniapp.name}`,
        action: {
          type: "launch_frame",
          name: miniapp.name,
          url: miniapp.homeUrl,
          splashImageUrl: miniapp.splashImageUrl,
          splashBackgroundColor: miniapp.splashBackgroundColor,
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
