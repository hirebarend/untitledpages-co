import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(`https://untitledpages.co/free-linkedin-headline`),
  description:
    "A LinkedIn headline is the section at the top of a LinkedIn user's profile where they describe what they do in 220 characters or less. This brief description appears next to the user's name in search results. It should entice readers to click the profile to learn more about the user's experience and background.",
  // icons: "https://untitledpages.co/android-chrome-512x512.png",
  title: "Free LinkedIn Headline | Untitled Pages",
  openGraph: {
    type: "website",
    description:
      "A LinkedIn headline is the section at the top of a LinkedIn user's profile where they describe what they do in 220 characters or less. This brief description appears next to the user's name in search results. It should entice readers to click the profile to learn more about the user's experience and background.",
    images: [
      `https://untitledpages.co/images/free-linkedin-headline/open-graph-image.png?v=2`,
    ],
    siteName: "Untitled Pages",
    title: "Free LinkedIn Headline | Untitled Pages",
    url: `https://untitledpages.co/free-linkedin-headline`,
    ttl: 1000,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
