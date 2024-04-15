import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL(`https://untitledpages.co`),
  description:
    "With over a decade in the industry and hands-on business experience, I'm here to guide you through your software development journey. Learn from my successes and setbacks to accelerate your growth. Limited mentorship slots available – join the waiting list today!",
  // icons: "https://untitledpages.co/android-chrome-512x512.png",
  title: "Exclusive 1-on-1 Software Engineering Mentorship! | Untitled Pages",
  openGraph: {
    type: "website",
    description:
      "With over a decade in the industry and hands-on business experience, I'm here to guide you through your software development journey. Learn from my successes and setbacks to accelerate your growth. Limited mentorship slots available – join the waiting list today!",
    images: [`https://untitledpages.co/images/open-graph-image.png?v=1`],
    siteName: "Untitled Pages",
    title: "Exclusive 1-on-1 Software Engineering Mentorship! | Untitled Pages",
    url: `https://untitledpages.co`,
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
