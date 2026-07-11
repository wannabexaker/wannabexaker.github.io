import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://wannabexaker.github.io";
const SITE_TITLE = "Ioannis Dimos | Security & Development";
const SITE_DESCRIPTION =
  "Portfolio of Ioannis Dimos (wannabexaker) — cybersecurity analyst, network engineer, and full-stack developer in Athens, Greece. MikroTik infrastructure, RF & wireless, IoT, and security tooling.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Ioannis Dimos",
    "wannabexaker",
    "cybersecurity analyst",
    "network engineer",
    "full-stack developer",
    "MikroTik",
    "RouterOS",
    "wireless",
    "RF engineering",
    "IoT",
    "Greece",
  ],
  authors: [{ name: "Ioannis Dimos", url: SITE_URL }],
  creator: "Ioannis Dimos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ioannis Dimos — wannabexaker",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ioannis Dimos — Cybersecurity Analyst, Network Engineer, Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ioannis Dimos",
  alternateName: "wannabexaker",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
  jobTitle: "Cybersecurity Analyst & Network Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Athens",
    addressCountry: "GR",
  },
  sameAs: [
    "https://github.com/wannabexaker",
    "https://www.linkedin.com/in/jiannisnw/",
  ],
  knowsAbout: [
    "Cybersecurity",
    "Network Engineering",
    "MikroTik RouterOS",
    "RF & Wireless Systems",
    "IoT",
    "Full-Stack Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
