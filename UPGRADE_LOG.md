# Upgrade Log — 2026-07-11

Ποιοτική αναβάθμιση του portfolio (στόχος: 7/10 → 8+/10).
Κάθε βήμα έχει δικό του commit + git tag για rollback: `git checkout <tag>` ή `git reset --hard <tag>`.

| Tag | Περιγραφή |
|---|---|
| `bak-step0-baseline` | Κατάσταση ΠΡΙΝ από κάθε αλλαγή (commit 7ccabbd) |
| `bak-step1-cleanup` | Μετά τον καθαρισμό νεκρού κώδικα/αρχείων |
| `bak-step2-seo` | Μετά τα SEO/sharing metadata |
| `bak-step3-images` | Μετά τη συμπίεση εικόνων |
| `bak-step4-content` | Μετά τις διορθώσεις περιεχομένου |

---

## Step 1 — Cleanup (νεκρός κώδικας & σκουπίδια)

- **Διαγράφηκαν 5 template SVGs** από το `public/`: `next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg` (default αρχεία του create-next-app, δεν χρησιμοποιούνταν πουθενά — επιβεβαιωμένο με grep).
- **`contact.tsx`**: αφαιρέθηκε όλη η ενσωμάτωση countapi.xyz (η υπηρεσία είναι νεκρή από το 2023 — τα 2 fetches αποτύγχαναν σιωπηλά σε κάθε επίσκεψη και ο μετρητής "X copies" δεν εμφανιζόταν ποτέ). Το copy-to-clipboard του email δουλεύει όπως πριν.
- **`projects.tsx`**: αφαιρέθηκε η αχρησιμοποίητη συνάρτηση `mapReposToProjects()` (νεκρός κώδικας — το `loadRepos` χτίζει τα projects inline).
- **`footer.tsx`**: το hardcoded έτος "2026" έγινε `new Date().getFullYear()` (υπολογίζεται στο build κάθε deploy).

**Κίνδυνος:** μηδενικός — μόνο αφαιρέσεις αχρησιμοποίητων στοιχείων. Build πέρασε.

---

## Step 2 — SEO & Social Sharing

- **Νέο OG image** (`public/og.png`, 1200×630): φτιαγμένο με το terminal aesthetic του site (grid, ASCII box, πράσινο glow). Τώρα το site δείχνει σωστό preview όταν γίνεται share σε LinkedIn / Discord / Twitter / Slack.
- **`layout.tsx` — πλήρη metadata**: `metadataBase`, OpenGraph (title/description/url/siteName/image), Twitter card (`summary_large_image`), keywords, authors, canonical, robots directives.
- **Τίτλος σελίδας**: "Ioannis | Security & Development" → **"Ioannis Dimos | Security & Development"** (το πλήρες όνομα είναι searchable).
- **`<h1>` στο hero**: "Ioannis" → **"Ioannis Dimos"** — recruiters που ψάχνουν το πλήρες όνομα πλέον σε βρίσκουν.
- **JSON-LD `Person` schema** στο `<body>`: όνομα, alias, ρόλος, τοποθεσία, GitHub/LinkedIn `sameAs`, γνωστικά πεδία — δομημένα δεδομένα για τη Google.
- **Νέα αρχεία `src/app/robots.ts` + `src/app/sitemap.ts`**: παράγουν `/robots.txt` και `/sitemap.xml` στο static export (3 URLs: root, em-spectrum, mcq-trainer).

**Επιβεβαιώθηκε στο build output**: `out/robots.txt`, `out/sitemap.xml`, `out/og.png`, OG meta tags με absolute URLs, JSON-LD παρόν.

---

## Step 3 — Συμπίεση εικόνων (WebP)

Όλα τα project screenshots μετατράπηκαν σε WebP (quality 82, sharp) και ενημερώθηκαν τα references στο `projects.tsx`:

| Αρχείο | Πριν | Μετά | Μείωση |
|---|---|---|---|
| The_Eye_in_the_Sky | 2.52 MB (png) | 220 KB (webp) | −91% |
| NetSentry | 975 KB (jpg) | 137 KB (webp) | −86% |
| pmd | 264 KB (png) | 106 KB (webp) | −60% |
| safestnotes | 362 KB (jpg) | 69 KB (webp) | −81% |
| **Σύνολο** | **4.17 MB** | **533 KB** | **−87%** |

- Τα παλιά originals διαγράφηκαν (υπάρχουν στο git history — ανακτήσιμα με `git show bak-step2-seo:public/screenshots/<file>`).
- Το `Sky-code.png` κρατήθηκε ως έχει (αχρησιμοποίητο προς το παρόν, θα ξαναχρειαστεί όταν το skycode repo γίνει public).
- Ποιότητα ελέγχθηκε οπτικά — κείμενο ευκρινές, χωρίς artifacts. WebP υποστηρίζεται από όλους τους σύγχρονους browsers.

**Αποτέλεσμα:** το βαρύτερο σημείο του site (preview panel εικόνες) φορτώνει ~8× γρηγορότερα.

---

## Step 4 — Διόρθωση About (wall of text)

Το bio στο About render-αρόταν ως **ένα ενιαίο paragraph ~150 λέξεων** — οι κενές γραμμές στο JSX δεν δημιουργούν line breaks στο HTML. Σπάστηκε σε 5 πραγματικά `<p>` με `space-y-4`:

1. Intro (ποιος είμαι, purple team mindset)
2. Networking & security core
3. RF & field work
4. Dev & hardware
5. Punchline — "If it runs on electrons..." τώρα ξεχωρίζει με primary χρώμα

**Οι λέξεις είναι ΑΚΡΙΒΩΣ οι ίδιες** — καμία αλλαγή στο περιεχόμενο, μόνο στη δομή. (Dev+hardware ενώθηκαν σε ένα paragraph για ισορροπία στήλης.)

---

## Τελική κατάσταση

- ✅ Build πέρασε σε κάθε βήμα (5 συνολικά verifications)
- ✅ ESLint καθαρό σε όλα τα αρχεία που αγγίχτηκαν
- ✅ 4 commits, 5 tags — rollback οποιαδήποτε στιγμή
- ⚠️ Προϋπάρχον (ΔΕΝ αγγίχτηκε): 16 lint errors σε shadcn/ui components (`react-hooks/set-state-in-effect` κ.ά.) — cosmetic, δεν επηρεάζουν το build

## Step 5 — Οριστική αφαίρεση skycode (απόφαση 2026-07-11)

Ο χρήστης αποφάσισε: το skycode ΔΕΝ θα ξαναμπεί στο portfolio.

- **Διαγράφηκε** το `public/screenshots/Sky-code.png` (τελευταίο απομεινάρι — ανακτήσιμο από git history αν ποτέ χρειαστεί: `git show bak-step4-content:public/screenshots/Sky-code.png`).
- **README.md**: η λίστα pinned repos διορθώθηκε από "(PMD, SafestNotes, skycode, The_Eye_in_the_Sky)" στη σωστή τρέχουσα "(NetSentry, SafestNotes, PMD, The_Eye_in_the_Sky)".
- Ο κώδικας (`projects.tsx`) ήταν ήδη καθαρός από skycode από προηγούμενη αλλαγή (NetSentry swap).

---

## Step 6 — SEO Round 2

- **Νέα app icons** (`icon-192.png`, `icon-512.png`, `apple-touch-icon.png`): terminal prompt `>_` με πράσινο glow, ίδια αισθητική με το site. Rendered με headless Chrome, resized με sharp.
- **`src/app/manifest.ts`**: παράγει `/manifest.webmanifest` (name, icons, theme/background color) — linked αυτόματα στο `<head>`.
- **`theme-color` meta** μέσω Next `viewport` export (`#060a08`) — το browser chrome σε mobile χρωματίζεται στο θέμα του site.
- **JSON-LD αναβαθμισμένο σε `@graph`** με 4 οντότητες:
  - `Person` (όπως πριν, τώρα με `@id` για references)
  - `WebSite` (publisher → Person)
  - `ProfilePage` (mainEntity → Person — σηματοδοτεί στη Google ότι είναι προσωπικό portfolio)
  - `ItemList` 6 projects ως `SoftwareSourceCode`/`WebApplication` με repo/live URLs και author → Person
- **Sitemap**: προστέθηκε `lastModified` σε όλα τα URLs.

**Επιβεβαιώθηκε στο build**: manifest.webmanifest + 3 icons στο `out/`, `rel="manifest"` + `rel="apple-touch-icon"` links στο HTML, όλα τα JSON-LD types παρόντα (Person, WebSite, ProfilePage, ItemList, 6× ListItem).

**Off-site SEO status:**
1. ✅ **Google Search Console**: verified (2026-07-12, meta tag + HTML file) και το `sitemap.xml` υποβλήθηκε.
2. ⏳ **Backlinks**: βάλε το site URL στο GitHub profile bio, LinkedIn, και στα READMEs των projects — τα inbound links είναι ο μεγαλύτερος ranking παράγοντας που λείπει.
3. ⏳ Χρόνος: τα structured data θέλουν λίγες εβδομάδες να εμφανιστούν σε rich results· τα πρώτα Search Console δεδομένα σε 2-3 μέρες.

---

## Step 7 — SQL Injection writeup (case study)

Το εκκρεμές case study υλοποιήθηκε ως **σελίδα μέσα στο site** (όχι ξεχωριστό repo) — βέλτιστο για SEO (indexable long-form content), self-contained, χωρίς θέμα δεδομένων πελατών.

- **Νέα σελίδα** `src/app/writeups/sql-injection/page.tsx` → `/writeups/sql-injection`. Server component (περιεχόμενο στο HTML για crawlers), terminal aesthetic, δικά της metadata + OpenGraph.
- **Δομή purple-team** (7 sections): Environment → Discovery → Exploitation → Impact → Remediation → Detection → Verification, με authorization banner στην κορυφή (authorized home-lab, isolated VM — ρητό disclaimer).
- **Τεχνικό περιεχόμενο**: vulnerable concatenation → error-based discovery, ORDER BY column count, auth bypass tautology, UNION extraction, boolean/time-blind· μετά remediation με parameterized queries (Node + C#/.NET before/after), least privilege, input validation, WAF· και detection signatures (log patterns, Suricata/IDS, SIEM).
- **Featured card** στο projects section (κόκκινο security accent, terminal mock με το `admin' --` payload) → link στη σελίδα.
- **SEO plumbing**: προστέθηκε στο `sitemap.ts`, TechArticle JSON-LD στη σελίδα + entry στο site-wide `@graph` (layout.tsx).

**Επιβεβαιώθηκε**: build OK, `out/writeups/sql-injection.html` παράγεται, sitemap + index link παρόντα, lint καθαρό, οπτικός έλεγχος desktop + mobile (code blocks scroll-άρουν σωστά, η σελίδα δεν σπάει).

> **Σημείωση περιεχομένου:** Το writeup είναι γραμμένο ως authorized lab exercise με τεχνικά ακριβές, αλλά generic περιεχόμενο. Μπορείς να το εξατομικεύσεις με πραγματικά στοιχεία από δικό σου lab (screenshots, specific payloads, το DB schema σου) όποτε θες — η δομή είναι έτοιμη.

---

## Step 8 — Content curation (roles + skills)

**Ρόλοι (about.tsx terminal block): 9 → 4.** Οι 4 headline ρόλοι (ίδιοι με το hero) με πλουσιότερα parentheticals ώστε ο καθένας να κουβαλά το βάθος του, + μια συμπαγής `also.txt` γραμμή που κρατά το εύρος (IoT/embedded, CCTV, fiber/PON, PV) χωρίς να διαλύει το focus. Το `locate passion` κόπηκε από 9 → 5 paths. Κανένα skill/εμπειρία δεν "χάθηκε" — απλά σταμάτησε να ανταγωνίζεται τους core ρόλους.

**Skills: 106 → 63 items (−40%).** Κάθε κάρτα στα 5-8 δυνατότερα, strongest-first. Κόπηκαν τα generic/αδύναμα/διπλότυπα:

| Κάρτα | Πριν | Μετά |
|---|---|---|
| Offensive Security | 9 | 7 |
| Defensive / Blue Team | 7 | 6 |
| Purple Team | 5 | 5 |
| Networking | 17 | 8 |
| Full Stack Dev | 17 | 7 |
| Tools & Platforms | 16 | 9 |
| Wireless & RF | 13 | 8 |
| Embedded & Hardware | 13 | 7 |
| Field & Infrastructure | 9 | 6 |

Αφαιρέθηκαν (δείγμα): "Rust (basics)", "Firmware Basics", "Basic Electrical Installations" (τα "basics" υποβαθμίζουν), "Crunch", "VS Code", "Visual Studio", "GitHub" (trivial), "ParrotOS" (διπλότυπο του Kali), "TCP/IP", "Routing & Switching" (θεωρούνται δεδομένα για senior). Κρατήθηκαν όλα τα **διακριτικά** που σε ξεχωρίζουν (Microwave P2P 18-90GHz, LoRa, wMBUS, OSPF/BGP, CCTV, PV, GIS, Suricata).

**Επιβεβαιώθηκε**: build OK, lint καθαρό, οπτικός έλεγχος terminal block (parens ευθυγραμμισμένα), content check στο build output (removed=0, differentiators παρόντα).

---

## Προτάσεις για την επόμενη φορά (8 → 9+)

1. **Ρόλοι στο terminal block: 9 → 4** — επιλογή των ισχυρότερων (θέλει δική σου απόφαση, είναι identity)
2. **Skills curation** — top 6-8 items ανά κάρτα, τα υπόλοιπα συμπτυγμένα
3. **SQL injection lab writeup** — το εκκρεμές case study· αυτό ανεβάζει το portfolio κατηγορία
4. **Mobile menu** — το λευκό sheet σπάει το dark theme (αν είναι σκόπιμο, αγνόησέ το)
5. Custom domain (π.χ. .dev) + analytics (GoatCounter/Plausible, δωρεάν & private)
