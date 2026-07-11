import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  Search,
  Users,
  DoorOpen,
  Wifi,
  Wrench,
  Radar,
  CheckCircle2,
} from "lucide-react";

const SITE_URL = "https://wannabexaker.github.io";
const PAGE_PATH = "/writeups/social-engineering";
const TITLE = "Social Engineering & Physical: Breaching the Human Perimeter";
const DESCRIPTION =
  "A full-scope social engineering and physical security assessment, from a defender's point of view — the shape of the work across reconnaissance, the human layer, physical access, and the remote angle, and the concrete controls that shut each one down. By Ioannis Dimos.";

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
    "security awareness",
    "human risk",
    "assessment",
  ],
  about: "Full-scope social engineering and physical assessment, focused on defensive outcomes.",
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
          <span className="text-muted-foreground">· 2026 · ~8 min read</span>
        </div>
        <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Social Engineering &amp; Physical:{" "}
          <span className="text-primary">Breaching the Human Perimeter</span>
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Some of the most serious findings I deliver never touch a line of code — they come from
          people, buildings, and trust. I run full-scope social engineering and physical assessments:
          the kind that answer, honestly, &ldquo;could someone talk and walk their way into your
          business?&rdquo; This is the <em>shape</em> of that work and, above all, how an organization
          shuts it down.
        </p>
      </header>

      {/* Authorization + tradecraft note */}
      <div className="mt-8 flex gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-yellow-400" />
        <div className="text-sm leading-6 text-foreground/80">
          <strong className="font-semibold text-yellow-300">Scope &amp; authorization.</strong> Every
          engagement runs under signed rules of engagement, defined objectives, named contacts, and an
          authorization letter carried on-site. Nothing here is done without that paperwork. The
          offensive detail is kept deliberately high-level — the value of this page is the
          <em> defensive </em>playbook, not a manual, and specific tradecraft stays with each client.
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <Section id="engagement" icon={ShieldCheck} step="00 · Engagement" title="What we're actually testing">
          <p>
            A full-scope engagement treats the whole organization as the attack surface — not just its
            firewalls, but its people, its front desk, its car park, and its Wi-Fi. The client sets the
            objective (reach a restricted area, obtain a specific piece of information, get a device
            onto the network) and the boundaries; I prove whether it&apos;s possible, safely and
            without disruption. The point is never to embarrass staff — it&apos;s to find the gap
            before someone with bad intent does.
          </p>
        </Section>

        <Section id="recon" icon={Search} step="01 · Reconnaissance" title="The desk phase">
          <p>
            The engagement is largely won before I go anywhere near the target. Working only from
            public information, I build a detailed picture of the organization and the people in it —
            structure, routines, relationships, and the small human details that make a later approach
            credible. It&apos;s methodical, patient work, and it&apos;s remarkable how much a
            determined outsider can assemble from what&apos;s already out in the open.
          </p>
          <p>
            The takeaway for a defender isn&apos;t the method — it&apos;s the volume. Your organization
            and your team leak far more publicly than anyone realizes, and that exposure is the raw
            material for everything that follows.
          </p>
        </Section>

        <Section id="human" icon={Users} step="02 · The human layer" title="Reading people, earning trust">
          <p>
            This is the core of the craft and the part I won&apos;t break down in detail. In short: I
            read how people and situations actually behave, match the approach to the person, and —
            when the engagement calls for it — work as a small, coordinated team so the pieces fit
            together naturally. The goal is a moment where a helpful person, wanting to do the right
            thing, shares something they shouldn&apos;t.
          </p>
          <p>
            It takes time, patience, and a lot of preparation. Being genuinely likeable and reading a
            room are the sharpest tools here — which is exactly why no product defends against them.
            Only trained, empowered people do.
          </p>
        </Section>

        <Section id="physical" icon={DoorOpen} step="03 · The physical layer" title="Getting in, and what waits inside">
          <p>
            Where the scope allows on-site work, I assess the building the way a real intruder would:
            how it&apos;s watched, where it&apos;s soft, and how a stranger with the right story and the
            right props becomes invisible. Access controls — badges, doors, and the human habit of
            holding them open — get tested end to end.
          </p>
          <p>
            Once someone is inside, the risk isn&apos;t theoretical: an unlocked workstation, an
            unattended port, or an unmonitored room is enough to leave something behind that a real
            attacker would use for persistent access. Proving that path — cleanly, and within scope —
            is usually the finding that changes how a company thinks about its front door.
          </p>
        </Section>

        <Section id="remote" icon={Wifi} step="04 · The wireless & remote angle" title="The perimeter you can't see">
          <p>
            Not every approach needs a physical presence. The wireless edge of a building leaks
            information about who&apos;s there and when, and the same rapport built during
            reconnaissance can be delivered remotely — a message that looks exactly like a colleague, a
            partner, or a client, arriving through the channels people already trust. Phishing and
            look-alike outreach turn one convincing message into a foothold.
          </p>
        </Section>

        <Section id="impact" icon={ShieldAlert} step="05 · Impact" title="Why it matters">
          <p>
            No exploit, no malware, no alert — and yet the objective is met: a restricted area reached,
            a critical credential obtained, a device on the internal network. Every technical control
            the organization paid for is bypassed by a held door, a friendly voice, or a well-timed
            message. That&apos;s the uncomfortable finding these assessments deliver: the human layer is
            usually the weakest, and it&apos;s the one nobody thinks to patch.
          </p>
        </Section>

        <Section id="remediation" icon={Wrench} step="06 · Remediation" title="Closing the human perimeter">
          <p>
            This is the part worth spending money on — and where I put the real detail, because
            defending is what actually protects a business:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              ["Security awareness, done well", "regular, realistic training so staff recognize pretexting and phishing — and a culture, backed by management, where politely challenging a stranger (“can I see your badge?”) is expected, not rude."],
              ["Reduce public exposure", "review what the organization and key staff publish; tighten profiles, remove sensitive operational detail, and treat OSINT reduction as an ongoing hygiene task."],
              ["Visitor & escort policy", "sign-in, photo badges, mandatory escorts, and verification of contractors against the vendor — a hi-vis vest should never be a skeleton key."],
              ["Physical access controls", "encrypted smartcards with mutual authentication (never unencrypted prox), anti-tailgating measures (turnstiles / mantraps), and controlled, logged access to server rooms and critical spaces."],
              ["Endpoint & port control", "block unknown USB/HID devices, auto-lock idle workstations, a clean-desk policy, and no unattended machines left unlocked."],
              ["Wi-Fi & email hardening", "WPA3-Enterprise with client isolation and rogue-AP detection; SPF/DKIM/DMARC, external-sender banners, and easy one-click phishing reporting."],
              ["MFA everywhere", "so that a stolen credential, a cloned badge, or a dropped device is never enough on its own to become a foothold."],
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
          <p>Prevention isn&apos;t perfect, so I hand the blue team what to watch for:</p>
          <ul className="space-y-2 pl-1">
            {[
              "Badge-in without a matching badge-out, and the same credential used in two places — the signatures of tailgating and cloning.",
              "USB device-insertion telemetry: a new input device appearing on a machine that already has one is a red flag worth alerting on.",
              "Reception and visitor logs reconciled against badge and CCTV events, with attention to the soft entries (deliveries, smoking areas, side doors).",
              "Rogue / look-alike Wi-Fi near the premises, and unusual client associations on the guest network.",
              "Phishing reports trending up, and mail from look-alike domains — a reporting culture turns every employee into a sensor.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="retest" icon={CheckCircle2} step="08 · Retest" title="Did it stick?">
          <p>
            A follow-up engagement is the real test of the fixes. After awareness training and
            physical controls, the same approach gets challenged at the door; after device control, a
            dropped implant is dead plastic; after email hardening, the look-alike message lands in
            quarantine. When the same playbook stops working, the controls are real — not just words in
            a policy nobody reads.
          </p>
        </Section>
      </div>

      {/* Takeaway */}
      <div className="mt-12 rounded-xl border border-primary/25 bg-primary/5 p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">Takeaway</div>
        <p className="mt-2 text-[15px] leading-7 text-foreground/85">
          You can spend a fortune on firewalls and still be undone by a held door and a confident
          smile. This work takes patience, preparation, and the nerve to see it through — but the
          finding it delivers is priceless: the human is the perimeter. Train it, and it becomes the
          strongest layer instead of the weakest.
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
