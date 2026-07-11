import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Radar,
  VenetianMask,
  DoorOpen,
  Usb,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const SITE_URL = "https://wannabexaker.github.io";
const PAGE_PATH = "/writeups/social-engineering";
const TITLE = "Social Engineering & Physical: Breaching the Human Perimeter";
const DESCRIPTION =
  "An authorized red-team walkthrough of a physical and social engineering assessment — OSINT, pretexting, tailgating, RFID/NFC badge cloning, and a BadUSB drop — then the awareness, access-control, and detection fixes that close the gap. By Ioannis Dimos.";

export const metadata: Metadata = {
  title: `${TITLE} | Ioannis Dimos`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}/og.png`,
  author: { "@type": "Person", name: "Ioannis Dimos", url: SITE_URL },
  publisher: { "@type": "Person", name: "Ioannis Dimos", url: SITE_URL },
  inLanguage: "en",
  keywords: [
    "social engineering",
    "physical penetration testing",
    "red team",
    "pretexting",
    "RFID cloning",
    "BadUSB",
    "security awareness",
  ],
  about: "Physical and social engineering assessment methodology, impact, and remediation.",
};

function Section({
  id,
  icon: Icon,
  step,
  title,
  children,
}: {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary">
          <Icon className="size-5" />
        </span>
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-secondary/80">{step}</div>
          <h2 className="terminal-title text-xl font-semibold sm:text-2xl">{title}</h2>
        </div>
      </div>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-foreground/85">{children}</div>
    </section>
  );
}

function Code({ label, children }: { label?: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-primary/20 bg-black/70">
      {label && (
        <div className="border-b border-primary/15 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 font-mono text-[13px] leading-6 text-[#d2e5dc]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function SocialEngineeringWriteup() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        back_to_portfolio
      </Link>

      {/* Header */}
      <header className="mt-8 border-b border-border/70 pb-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/5 px-2.5 py-0.5 text-purple-300">
            Writeup
          </span>
          <span className="rounded-full border border-secondary/30 px-2.5 py-0.5 text-secondary">
            Physical / Social Eng.
          </span>
          <span className="text-muted-foreground">· 2026 · ~11 min read</span>
        </div>
        <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Social Engineering &amp; Physical:{" "}
          <span className="text-primary">Breaching the Human Perimeter</span>
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Firewalls don&apos;t stop a friendly face with a clipboard. This is how a physical and
          social engineering assessment actually runs — reconnaissance, a believable pretext, the
          walk-in, the cloned badge, the dropped device — and, the part that matters, how an
          organization closes every one of those doors.
        </p>
      </header>

      {/* Authorization banner */}
      <div className="mt-8 flex gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-yellow-400" />
        <div className="text-sm leading-6 text-foreground/80">
          <strong className="font-semibold text-yellow-300">Scope &amp; authorization.</strong> This
          describes a <em>contracted</em> assessment with signed rules of engagement, defined
          objectives, named points of contact, and a signed authorization letter carried on-site
          (the &ldquo;get-out-of-jail&rdquo; letter). Impersonating people or entering premises
          without that paperwork is a crime. The techniques are generalized on purpose — the value
          here is the defensive playbook, not a break-in manual.
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <Section id="scope" icon={ShieldCheck} step="00 · Engagement" title="The objective">
          <p>
            The client wanted to know a simple thing: could someone off the street reach their
            internal network without a single exploit? The agreed objective was to gain access to a
            restricted floor and connect an unauthorized device to the corporate LAN — proving the
            path, not causing harm. Rules of engagement fixed the dates, the in-scope buildings, the
            emergency contacts, and a hard stop if any staff member was distressed.
          </p>
        </Section>

        <Section id="recon" icon={Radar} step="01 · Reconnaissance" title="OSINT before I ever show up">
          <p>
            The engagement is won before I arrive. Public sources give up an enormous amount: the org
            chart and new-hire announcements from LinkedIn, the dress code and lanyard colour from
            photos staff post, the building layout and delivery entrance from mapping tools, and the
            names of the cleaning and HVAC vendors from a careless job ad. A badge visible in one
            conference photo tells me the card technology and the artwork I need to fake.
          </p>
          <Code label="footprint — what public data hands an attacker">{`org structure   → who reports to whom, who's new (new hires don't know faces)
dress + badge   → lanyard colour, badge artwork, ID format
vendors         → HVAC / cleaning / courier uniforms to impersonate
building        → entrances, smoking area, loading dock, reception hours
tech stack      → job ads reveal the EDR, VPN, and badge system in use`}</Code>
          <p>
            None of this touches the target&apos;s systems. It&apos;s all volunteered — which is
            exactly why it&apos;s so effective.
          </p>
        </Section>

        <Section id="pretext" icon={VenetianMask} step="02 · Pretext" title="Becoming someone they expect">
          <p>
            A pretext is a story the target <em>wants</em> to be true because it&apos;s ordinary. The
            strongest ones aren&apos;t elaborate — they&apos;re boring and expected: a contractor
            there for the aircon, a courier with a heavy box, a new starter who forgot their badge on
            their first day. Props sell it more than words: a hi-vis vest, a clipboard, a matching
            lanyard, and the confidence of someone who belongs. This is where being genuinely
            personable is the sharpest tool I own — people help someone they like, and they&apos;ll
            reveal what they shouldn&apos;t to avoid seeming unhelpful.
          </p>
          <p>
            <strong className="text-foreground">Elicitation</strong> does the rest: friendly,
            low-stakes questions that a helpful person answers without thinking — &ldquo;is Maria from
            facilities in today?&rdquo; — each answer making the next request more credible.
          </p>
        </Section>

        <Section id="entry" icon={DoorOpen} step="03 · The walk-in" title="Tailgating & badge cloning">
          <p>
            <strong className="text-foreground">Tailgating</strong> is the oldest and most reliable
            entry: fall into step behind a group at a busy door, hands full, and social pressure holds
            the door open for you. Nobody wants to shut a door in a stranger&apos;s face. The smoking
            area and the loading dock are the soft edges of almost every building.
          </p>
          <p>
            <strong className="text-foreground">Badge cloning</strong> is the technical half. Many
            sites still run low-frequency 125&nbsp;kHz proximity cards with no encryption — a handheld
            reader/writer can capture one at conversational distance and write a working duplicate to a
            blank in seconds. Higher-frequency 13.56&nbsp;MHz cards can be stronger, but only when the
            secure sectors are actually used; plenty are deployed with default keys.
          </p>
          <Code label="access-control reality (why cloning works)">{`125 kHz prox (unencrypted)   → read at distance, clone to blank card
13.56 MHz w/ default keys     → readable, effectively unprotected
13.56 MHz w/ mutual auth      → the goal state — cloning fails here`}</Code>
        </Section>

        <Section id="payload" icon={Usb} step="04 · The drop" title="BadUSB — a keyboard, not a disk">
          <p>
            Once inside, the fastest foothold isn&apos;t a hacked server — it&apos;s an unlocked,
            unattended workstation and a device that pretends to be a keyboard. A BadUSB / Rubber Ducky
            isn&apos;t seen as storage; the operating system trusts it as human input and it types
            faster than any person. In the engagement this runs an <em>authorized</em> beacon back to
            my lab; the payload below is deliberately harmless — it just proves keystroke injection by
            leaving a marker:
          </p>
          <Code label="illustrative DuckyScript — runs as the logged-in user">{`REM proof-of-concept only — no real payload
DELAY 2000
GUI r
DELAY 500
STRING notepad
ENTER
DELAY 800
STRING  [assessment marker] keystroke injection succeeded @ HH:MM
REM a real engagement would drop an authorized, scoped beacon here`}</Code>
          <p>
            A &ldquo;lost&rdquo; USB stick left in the car park works on the same human instinct —
            curiosity plugs it in. The lesson isn&apos;t about the device; it&apos;s that physical
            access plus trust turns any USB port into an entry point.
          </p>
        </Section>

        <Section id="impact" icon={ShieldAlert} step="05 · Impact" title="What it proved">
          <p>
            No exploit, no malware signature, no alert — and yet a stranger reached a restricted floor
            and put a device on the internal network. The same path in a real attack means data theft,
            ransomware staging, or a persistent foothold that no perimeter firewall would ever see.
            Every technical control the client had invested in was bypassed by holding a door and
            wearing a vest. That&apos;s the uncomfortable truth these assessments surface: the human
            layer is usually the weakest, and it&apos;s the one nobody patches.
          </p>
        </Section>

        <Section id="remediation" icon={Wrench} step="06 · Remediation" title="Closing the human perimeter">
          <p>
            The fix is culture plus a few concrete controls — no single product solves it:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              ["Security awareness", "regular, realistic training so staff can spot pretexting and feel empowered to challenge strangers — a polite “can I see your badge?” culture, backed by management."],
              ["Anti-tailgating", "mantraps, turnstiles, or airlocks at critical entries so one badge equals one person; a smoking-door camera and clear escort policy for visitors."],
              ["Stronger badges", "encrypted 13.56 MHz smartcards with mutual authentication — never unencrypted 125 kHz prox; rotate keys, kill default keys."],
              ["USB device control", "endpoint policy that blocks unknown HID/storage devices, port control on sensitive machines, and auto-lock on idle so no workstation sits open."],
              ["Visitor management", "sign-in, photo badges, and mandatory escorts — a hi-vis vest should never be a skeleton key."],
              ["MFA everywhere", "so that even a cloned badge or a dropped device can't turn physical access straight into a domain foothold."],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>
                  <strong className="font-semibold text-foreground">{k} —</strong> {v}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="detection" icon={Radar} step="07 · Detection" title="Seeing it when it happens">
          <p>
            Prevention isn&apos;t perfect, so I hand the blue team what to watch for:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "Badge-in without a matching badge-out — the signature of tailgating — and “impossible travel” where one card is used in two places.",
              "USB device-insertion telemetry from the EDR: a new HID (keyboard) appearing on a machine that already has one is a red flag.",
              "Reception and visitor logs reconciled against badge events; CCTV review at the soft entries (smoking door, loading dock).",
              "Endpoint alerts for a Run dialog / scripting host launched seconds after a device insertion — the BadUSB fingerprint.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="verification" icon={CheckCircle2} step="08 · Retest" title="Did it stick?">
          <p>
            A follow-up visit is the real test of the fixes. After awareness training and turnstiles,
            the same tailgating attempt gets challenged at the door; after USB device control, the
            dropped device is a dead plastic stick; after smartcard upgrades, the cloned badge opens
            nothing. When the same playbook stops working, the controls are real — not just written in
            a policy nobody reads.
          </p>
        </Section>
      </div>

      {/* Takeaway */}
      <div className="mt-12 rounded-xl border border-primary/25 bg-primary/5 p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">Takeaway</div>
        <p className="mt-2 text-[15px] leading-7 text-foreground/85">
          You can spend a fortune on firewalls and still be undone by a held door and a confident
          smile. The most valuable thing these assessments give a company isn&apos;t a list of
          gadgets to buy — it&apos;s permission for staff to say &ldquo;who are you?&rdquo; The human
          is the perimeter. Train it, and it becomes the strongest layer instead of the weakest.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          back_to_portfolio
        </Link>
        <Link href="/writeups/sql-injection" className="font-mono text-sm text-primary hover:underline">
          next: SQL injection writeup →
        </Link>
      </div>
    </main>
  );
}
