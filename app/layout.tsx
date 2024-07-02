import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://untitledpages.co",
  },
  metadataBase: new URL("https://untitledpages.co"),
  description:
    "Talented Engineers connects you with rigorously vetted, world-class engineers ready to tackle your most challenging projects.",
  // icons: "https://untitledpages.co/android-chrome-512x512.png",
  title: "Join Talented Engineers",
  openGraph: {
    type: "website",
    description:
      "Talented Engineers connects you with rigorously vetted, world-class engineers ready to tackle your most challenging projects.",
    images: [`https://untitledpages.co/images/open-graph-image.png?v=4`],
    siteName: "Untitled Pages",
    title: "Join Talented Engineers",
    url: "https://untitledpages.co",
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
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
