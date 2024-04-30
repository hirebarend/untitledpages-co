import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(`https://untitledpages.co/link-bird-source-code`),
  description:
    "Link Bird is an API-first alternative to Bitly, Dub.co, Bl.ink, Short.io and many others.",
  // icons: "https://untitledpages.co/android-chrome-512x512.png",
  title: "Link Bird Source Code | Untitled Pages",
  openGraph: {
    type: "website",
    description:
      "Link Bird is an API-first alternative to Bitly, Dub.co, Bl.ink, Short.io and many others.",
    images: [
      `https://untitledpages.co/images/link-bird-source-code/open-graph-image.png?v=3`,
    ],
    siteName: "Untitled Pages",
    title: "Link Bird Source Code | Untitled Pages",
    url: `https://untitledpages.co/link-bird-source-code`,
    ttl: 1000,
  },
};

export default function RootLayout1({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
