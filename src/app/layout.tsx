import type { Metadata, Viewport } from "next";
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
  verification: {
    google: "GjFSQtZ2bENG_bEP591xUnsYtWW-FG6IJHaSDiwWPw4",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "256x256" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#060a08",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
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
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ioannis Dimos — wannabexaker",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Selected Projects",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: "NetSentry",
            description:
              "Telegram-based monitoring & control for MikroTik networks — real-time alerts, guest WiFi rotation with QR codes, automated config backups.",
            codeRepository: "https://github.com/wannabexaker/NetSentry",
            programmingLanguage: "Python",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "WebApplication",
            name: "EM Spectrum Explorer",
            description:
              "Interactive electromagnetic spectrum atlas with WebGL zoom/pan — RF bands, wireless technologies, and modulation types.",
            url: `${SITE_URL}/em-spectrum/`,
            applicationCategory: "EducationalApplication",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "WebApplication",
            name: "MCQ Trainer",
            description:
              "Multiple-choice exam trainer with Networking / Cybersecurity / SQL / IT question sets, exam and practice modes — offline PWA and Android APK.",
            url: `${SITE_URL}/mcq-trainer/`,
            applicationCategory: "EducationalApplication",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "SoftwareSourceCode",
            name: "SafestNotes",
            description:
              "Encrypted local notes app for Android — zero-network, privacy-first note storage.",
            codeRepository: "https://github.com/wannabexaker/Safest-Notes",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "SoftwareSourceCode",
            name: "PMD — Project Management Dashboard",
            description:
              "Full-stack project management dashboard — React/Vite frontend, Spring Boot API, MongoDB, and Docker.",
            codeRepository: "https://github.com/wannabexaker/PMD",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 6,
          item: {
            "@type": "SoftwareSourceCode",
            name: "The Eye in the Sky",
            description:
              "Slot simulation platform — TypeScript game engine, Next.js player shell, NestJS API, SQL Server, and an RTP validation harness.",
            codeRepository: "https://github.com/wannabexaker/The_Eye_in_the_Sky",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
        {
          "@type": "ListItem",
          position: 7,
          item: {
            "@type": "MobileApplication",
            name: "Fit Sentry",
            description:
              "A fitness tracker built as an RPG — your workouts level up your character.",
            operatingSystem: "Android",
            applicationCategory: "HealthApplication",
            url: "https://play.google.com/store/apps/details?id=com.fitsentry.app",
            installUrl: "https://play.google.com/store/apps/details?id=com.fitsentry.app",
            author: { "@id": `${SITE_URL}/#person` },
          },
        },
      ],
    },
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/writeups/sql-injection#article`,
      headline: "SQL Injection: From Discovery to Remediation",
      description:
        "Authorized home-lab walkthrough of SQL injection — discovery, exploitation, impact, and parameterized-query remediation.",
      url: `${SITE_URL}/writeups/sql-injection`,
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "TechArticle",
      "@id": `${SITE_URL}/writeups/social-engineering#article`,
      headline: "Social Engineering & Physical: Breaching the Human Perimeter",
      description:
        "A full-scope social engineering and physical security assessment from a defender's point of view — reconnaissance, the human layer, physical access, and the remote angle, with concrete remediation and detection.",
      url: `${SITE_URL}/writeups/social-engineering`,
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
