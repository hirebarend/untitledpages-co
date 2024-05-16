import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://untitledpages.co",
  },
  metadataBase: new URL("https://untitledpages.co"),
  description:
    "Personalized mentorship program tailored to enhance your engineering skills and secure a more senior role.",
  // icons: "https://untitledpages.co/android-chrome-512x512.png",
  title: "Accelerate Your Software Engineering Career | Untitled Pages",
  openGraph: {
    type: "website",
    description:
      "Personalized mentorship program tailored to enhance your engineering skills and secure a more senior role.",
    images: [`https://untitledpages.co/images/open-graph-image.png?v=3`],
    siteName: "Untitled Pages",
    title: "Accelerate Your Software Engineering Career | Untitled Pages",
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
