import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://getverified.co.za",
  },
  metadataBase: new URL("https://getverified.co.za"),
  description:
    "Get Verified makes digital identity simple. We make it easy for people to access services by digitally verifying them using our Identity Platform.",
  icons: "https://getverified.co.za/icon.png",
  title: "Home | Get Verified",
  openGraph: {
    type: "website",
    description:
      "Get Verified makes digital identity simple. We make it easy for people to access services by digitally verifying them using our Identity Platform.",
    images: [`https://getverified.co.za/images/open-graph-image.png?v=4`],
    siteName: "Get Verified",
    title: "Home | Get Verified",
    url: "https://getverified.co.za",
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
