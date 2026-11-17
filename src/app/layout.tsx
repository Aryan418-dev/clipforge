import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ClipForge — Turn Hours of Content Into Minutes of Editing",
  description:
    "AI-powered video clipping for creators. Automatically turn long-form videos, podcasts, streams and gameplay into engaging Shorts, Reels and TikToks. Coming soon — join the waitlist and Founding Creator Program.",
  keywords: [
    "AI video clipping",
    "OpusClip alternative",
    "YouTube Shorts",
    "Instagram Reels",
    "TikTok clips",
    "gameplay clips",
    "podcast clips",
    "AI captions",
    "vertical video",
    "GTA VI content",
  ],
  authors: [{ name: "ClipForge" }],
  openGraph: {
    title: "ClipForge — AI Video Clipping for Creators",
    description:
      "Turn hours of content into minutes of editing. Join the waitlist for early access and the Founding Creator Program.",
    type: "website",
    locale: "en_US",
    siteName: "ClipForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipForge — AI Video Clipping for Creators",
    description:
      "Turn hours of content into minutes of editing. Join the waitlist for early access.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body">
        {children}
      </body>
    </html>
  );
}
