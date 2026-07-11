import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ShieldAlert, Bug, Wrench, Radar, CheckCircle2 } from "lucide-react";

const SITE_URL = "https://wannabexaker.github.io";
const PAGE_PATH = "/writeups/sql-injection";
const TITLE = "SQL Injection: From Discovery to Remediation";
const DESCRIPTION =
  "An authorized home-lab walkthrough of SQL injection — discovery, exploitation techniques (auth bypass, UNION, blind), impact assessment, and the parameterized-query remediation that closes it. Purple-team methodology by Ioannis Dimos.";

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
    "SQL injection",
    "web application security",
    "penetration testing",
    "parameterized queries",
    "purple team",
    "OWASP",
  ],
  about: "SQL injection discovery, exploitation, impact, and remediation in an authorized lab.",
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

export default function SqlInjectionWriteup() {
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
          <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-primary">
            Writeup
          </span>
          <span className="rounded-full border border-secondary/30 px-2.5 py-0.5 text-secondary">
            Web App Security
          </span>
          <span className="text-muted-foreground">· 2026 · ~10 min read</span>
        </div>
        <h1 className="mt-4 font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          SQL Injection: <span className="text-primary">From Discovery to Remediation</span>
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          A purple-team walkthrough of a classic SQL injection — how I find it, prove its impact,
          and, most importantly, how I close it. Written from an authorized home-lab exercise, not
          any client or employer environment.
        </p>
      </header>

      {/* Authorization banner */}
      <div className="mt-8 flex gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-5">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-yellow-400" />
        <div className="text-sm leading-6 text-foreground/80">
          <strong className="font-semibold text-yellow-300">Scope &amp; authorization.</strong> Every
          command below was run against a deliberately vulnerable application I stood up on an
          isolated VM in my own lab. Testing systems you don&apos;t own or have written permission to
          assess is illegal. This page is written for defenders — the goal is understanding the bug
          well enough to eliminate it.
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <Section id="setup" icon={ShieldCheck} step="00 · Environment" title="The target">
          <p>
            The lab app is a small storefront: a login form and a product-search endpoint, backed by
            MySQL, with a Node/Express and a C#/.NET variant so I can show the fix in both stacks. The
            vulnerable query concatenates user input straight into SQL — the single most common root
            cause I see in real assessments:
          </p>
          <Code label="vulnerable — string concatenation">{`// login handler (Node/Express) — DO NOT SHIP THIS
const q = "SELECT id, role FROM users " +
          "WHERE username = '" + req.body.user + "' " +
          "AND password = '" + req.body.pass + "'";
const rows = await db.query(q);
if (rows.length) grantSession(rows[0]);`}</Code>
          <p>
            The user&apos;s input becomes part of the query&apos;s <em>structure</em>, not just its
            data. That confusion between code and data is the whole vulnerability.
          </p>
        </Section>

        <Section id="discovery" icon={Radar} step="01 · Discovery" title="Finding the injection point">
          <p>
            I map every input that reaches the database — form fields, URL parameters, headers,
            cookies — and probe each with a single quote. A raw database error is the first tell:
          </p>
          <Code label="probe → server error (error-based signal)">{`username:  admin'
→ 500: You have an error in your SQL syntax near "'' AND password = ''"`}</Code>
          <p>
            That error confirms the input breaks out of the string literal. I fingerprint the engine
            (error dialect, version functions) and count result columns with an incremental{" "}
            <span className="font-mono text-primary">ORDER BY</span> until it fails — that tells me how
            many columns a <span className="font-mono text-primary">UNION</span> needs to match.
          </p>
          <Code label="column count">{`search?q=phone' ORDER BY 1--   → ok
search?q=phone' ORDER BY 5--   → ok
search?q=phone' ORDER BY 6--   → error   ⇒ 5 columns`}</Code>
        </Section>

        <Section id="exploit" icon={Bug} step="02 · Exploitation" title="Proving impact">
          <p>
            <strong className="text-foreground">Authentication bypass.</strong> A tautology in the
            username field turns the <span className="font-mono text-primary">WHERE</span> clause
            always-true and comments out the password check:
          </p>
          <Code label="auth bypass">{`username:  admin' --
password:  (anything)

→ SELECT id, role FROM users WHERE username = 'admin' -- ' AND password = '...'
→ logs in as admin, password never evaluated`}</Code>
          <p>
            <strong className="text-foreground">UNION-based extraction.</strong> With the column count
            known, I append a <span className="font-mono text-primary">UNION SELECT</span> to pull data
            from other tables into the search results:
          </p>
          <Code label="data exfiltration">{`q = kettle' UNION SELECT username, password_hash, email, 4, 5 FROM users--

→ the product list now renders every credential row in the users table`}</Code>
          <p>
            <strong className="text-foreground">Blind injection.</strong> When the app returns no
            errors and no reflected data, the database still leaks through <em>behaviour</em>. Boolean
            conditions change the response; time delays confirm inference when even that is hidden:
          </p>
          <Code label="boolean-blind & time-blind">{`# response differs when the condition is true → read data one bit at a time
id=7 AND SUBSTRING((SELECT role FROM users WHERE id=1),1,1)='a'

# no visible difference? make the server wait to answer yes/no
id=7 AND IF(SUBSTRING(version(),1,1)='8', SLEEP(3), 0)   -- MySQL
id=7; IF (…) WAITFOR DELAY '0:0:3'                        -- MSSQL`}</Code>
        </Section>

        <Section id="impact" icon={ShieldAlert} step="03 · Impact" title="Why it matters">
          <p>
            One concatenated query put the entire <span className="font-mono text-primary">users</span>{" "}
            table — including password hashes — in reach, and let an attacker log in as any account
            without a password. Against a database account with excess privileges, stacked queries and
            engine features (e.g. <span className="font-mono text-primary">xp_cmdshell</span> on
            misconfigured MSSQL, file writes on MySQL) can escalate from data theft to code execution.
            In CIA terms: confidentiality and integrity are gone, and availability is one{" "}
            <span className="font-mono text-primary">DROP</span> away. This is why SQL injection has sat
            in the OWASP Top 10 (now under <em>A03: Injection</em>) for over two decades.
          </p>
        </Section>

        <Section id="remediation" icon={Wrench} step="04 · Remediation" title="The fix that actually works">
          <p>
            The fix is not escaping or blacklisting quotes — it&apos;s never letting input become code.
            Parameterized queries (prepared statements) send the SQL structure and the data on separate
            channels, so input is always treated as a value:
          </p>
          <Code label="fixed — parameterized (Node)">{`const rows = await db.query(
  "SELECT id, role FROM users WHERE username = ? AND password_hash = ?",
  [req.body.user, hash(req.body.pass)]
);`}</Code>
          <Code label="fixed — parameterized (C# / .NET)">{`using var cmd = new SqlCommand(
  "SELECT id, role FROM users WHERE username = @user AND password_hash = @hash", conn);
cmd.Parameters.AddWithValue("@user", model.User);
cmd.Parameters.AddWithValue("@hash", Hash(model.Pass));`}</Code>
          <p>Parameterization is the control that closes it. The rest is defense-in-depth:</p>
          <ul className="space-y-2 pl-1">
            {[
              ["Least privilege", "the app's DB account gets only the rights it needs — no DROP, no xp_cmdshell, no FILE."],
              ["Input validation", "allowlist expected shapes (numeric IDs, enum values) and reject the rest — a second layer, never the only one."],
              ["Safe ORMs / stored procedures", "used correctly they parameterize by default; string-built dynamic SQL inside them re-opens the hole."],
              ["Hashing", "passwords stored with bcrypt/argon2, so an exfiltrated table isn't instantly usable."],
              ["WAF", "catches known payloads at the edge — useful as a speed bump, not a substitute for the code fix."],
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

        <Section id="detection" icon={Radar} step="05 · Detection" title="Catching it in production">
          <p>
            Prevention closes the bug; detection tells me when someone tries. On the blue-team side I
            watch for the fingerprints these techniques leave:
          </p>
          <ul className="space-y-2 pl-1">
            {[
              "Spikes in database syntax errors in application logs — probing is noisy.",
              "Requests containing UNION SELECT, ORDER BY ladders, SLEEP/WAITFOR/BENCHMARK, or comment sequences (--, #, /*).",
              "Response-time outliers on a single parameter — the signature of time-blind injection.",
              "Suricata/IDS rules on the SQLi payload patterns, plus SIEM correlation of failed-login bursts against one account.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="verification" icon={CheckCircle2} step="06 · Verification" title="Re-test">
          <p>
            After the parameterized rewrite I replay every payload from the exploitation phase. The
            tautology now searches for a user literally named{" "}
            <span className="font-mono text-primary">admin&apos; --</span>, the{" "}
            <span className="font-mono text-primary">UNION</span> is treated as a search string, and the
            blind conditions never execute. Same inputs, no bypass, no leak — the fix holds under the
            original attack.
          </p>
        </Section>
      </div>

      {/* Takeaway */}
      <div className="mt-12 rounded-xl border border-primary/25 bg-primary/5 p-6">
        <div className="font-mono text-[11px] uppercase tracking-widest text-primary">Takeaway</div>
        <p className="mt-2 text-[15px] leading-7 text-foreground/85">
          The attacker&apos;s job was easy because input and code shared a channel. The defender&apos;s
          job is to keep them apart — parameterize by default, run least-privilege, and log the
          probes. Thinking like the attacker is what makes the fix obvious.
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
        <a
          href="https://github.com/wannabexaker"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-primary hover:underline"
        >
          github.com/wannabexaker
        </a>
      </div>
    </main>
  );
}
