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

## Step 9 — Νέα κάρτα: Social Engineering & Physical

Ο χρήστης επισήμανε πραγματικά skills που έλειπαν και τα τοποθέτησε (λανθασμένα) στο Purple Team. Διόρθωση: αυτά είναι **offensive (red-team physical & social)**, όχι purple (που = red+blue συνεργασία). Μπήκαν σε **δική τους κάρτα** — differentiator, όχι buried.

- **Νέα κάρτα "Social Engineering & Physical"** (μοβ accent, `VenetianMask` icon), 2η στη σειρά μετά το Offensive Security. Items: Pretexting & Impersonation, Elicitation & Trust Building, Phishing / Vishing Campaigns, Rubber Ducky / BadUSB (HID Injection), RFID / NFC Cloning & Access Bypass, Physical Access Testing, OSINT.
- **Bio ενισχύθηκε**: η security πρόταση αναφέρει τώρα ρητά "social engineering and physical access (badge cloning, BadUSB, pretexting)".
- Skills: 9 → 10 κάρτες, 63 → 70 items.

**Επιβεβαιώθηκε**: build OK, lint καθαρό, a11y tree (κάρτα + 7 items στη σωστή θέση), bio updated.

---

## Step 10 — CV: social engineering & physical

Το CV (PDF) δεν ανέφερε καθόλου το social/physical κομμάτι. Ενημερώθηκε το HTML source, ξαναβγήκε PDF (headless Chrome), αντικαταστάθηκε το `public/cv_ioannis_dimos.pdf` (ίδιο όνομα → καμία αλλαγή κώδικα).

- **Profile paragraph**: "authorized security assessments across web, wireless, **infrastructure, social engineering and physical access**".
- **Core Skills → Security row**: +4 chips — Social engineering · pretexting, Physical access · RFID/NFC cloning, BadUSB / Rubber Ducky, OSINT.
- Επιβεβαιώθηκε οπτικά (preview render): chips wrap σωστά, το doc παραμένει καθαρό. Temp build dir καθαρίστηκε.

## Step 11 — Δεύτερο writeup: Social Engineering & Physical

Δεύτερο case study, ίδια δομή/ποιότητα με το SQLi.

- **Νέα σελίδα** `src/app/writeups/social-engineering/page.tsx` → `/writeups/social-engineering`. Authorized red-team engagement (signed ROE, get-out-of-jail letter — ρητό disclaimer).
- **Δομή** (9 sections): Engagement objective → OSINT recon → Pretext → Tailgating & badge cloning → BadUSB drop → Impact → Remediation → Detection → Retest. Techniques σκόπιμα generalized (defensive playbook, όχι break-in manual)· το DuckyScript είναι harmless PoC marker.
- **Featured card** στο projects (μοβ accent, badge-clone terminal mock) → link.
- **SEO**: sitemap entry + TechArticle JSON-LD (σελίδα + site `@graph`).

**Επιβεβαιώθηκε**: build OK, `out/writeups/social-engineering.html`, sitemap + index link, lint καθαρό, οπτικός έλεγχος (terminal aesthetic, sections, code blocks).

---

## Step 12 — Skills: ενοποίηση σε 6 κάρτες (grid parity)

Ο χρήστης θέλει το skills grid πάντα καθαρό — **6 κάρτες** βγαίνει τέλεια και σε 2 στήλες (3×2) και σε 3 στήλες (2×3), ποτέ ορφανή κάρτα (το 9 ή 10 άφηνε πάντα ένα leftover). Επίσης ζήτησε το step-9 "Social Engineering & Physical" card να μπει μέσα σε **μετονομασμένο Purple Team**.

10 → **6 κάρτες**, όλο το περιεχόμενο διατηρήθηκε:

| # | Κάρτα | Προέλευση |
|---|---|---|
| 1 | Offensive Security | + τα offensive tools (Kali, Wireshark, Nessus, ZAP) από το πρώην "Tools & Platforms" |
| 2 | **Social Engineering & Red Team** | πρώην "Purple Team" μετονομασμένο, absorbs το "Social Engineering & Physical" + Attack Simulation · MITRE · TTPs |
| 3 | Defensive & Detection | πρώην "Defensive / Blue Team" + Detection Engineering + Grafana/Prometheus |
| 4 | Networking | ως είχε |
| 5 | Full Stack Dev | + Docker · Proxmox |
| 6 | **RF, Field & Hardware** | ένωση "Wireless & RF" + "Embedded & Hardware" + "Field & Infrastructure" |

Το πρώην "Tools & Platforms" διαλύθηκε και τα εργαλεία μοιράστηκαν στις Offensive/Defensive κάρτες όπου ανήκουν. Αφαιρέθηκαν αχρησιμοποίητα icon imports (Cpu, Terminal, Wrench, Zap).

**Επιβεβαιώθηκε**: build OK, lint καθαρό, a11y tree = ακριβώς 6 κάρτες με σωστό περιεχόμενο. (Το social-eng *writeup* featured card στο projects παραμένει — ξεχωριστό από τις skill κάρτες.)

---

## Step 13 — JavaScript + Network Monitoring

Μετά από live verification (και οι 6 κάρτες σωστές στο production):

- **Full Stack Dev**: το JavaScript έγινε ρητό — `JavaScript · TypeScript` (είχε αφαιρεθεί στο curation ως υπονοούμενο από το TS, αλλά ο χρήστης έχει ολόκληρα projects σε JS: EM Spectrum, MCQ, The Eye in the Sky).
- **Defensive & Detection**: +`Network Monitoring & Alerting` — αποφασίστηκε μαζί με τον χρήστη. Το backing είναι το **NetSentry** (το #1 project του): real-time MikroTik alerts, δηλαδή defensive monitoring που έφτιαξε ο ίδιος. Συνδέει flagship project ↔ skill.

Grid παραμένει 6 κάρτες. Build/lint καθαρά, live confirmed.

---

## Step 14 — Εξατομίκευση social-eng writeup (covered style)

Ο χρήστης έδωσε την πραγματική του μεθοδολογία αλλά **ζήτησε ρητά να ΜΗΝ εκτίθενται οι συγκεκριμένες τεχνικές του** (διακριτικό επάγγελμα). Βλ. [[feedback-security-content-general]].

- Το writeup ξαναγράφτηκε: η **offensive πλευρά γενική/covered** (φάσεις & εύρος — reconnaissance, human layer, physical, wireless/remote — όχι βήματα). Ρητή δήλωση στη σελίδα ότι το tradecraft μένει ιδιωτικό ("the part I won't break down in detail").
- Η **λεπτομέρεια μεταφέρθηκε στο defense**: αναλυτικό remediation (7 controls) + detection (5 signatures) — το χρήσιμο & shareable κομμάτι.
- Αφαιρέθηκαν τα operational code blocks (DuckyScript, badge-clone payload). Επιβεβαιώθηκε: Rubber Ducky / BadUSB / 125kHz / prox card = 0 στο output (το "mantrap" που έμεινε είναι στο remediation, defensive).
- Ενημερώθηκαν και το featured card blurb + terminal mock (badge.clone → human.layer, γενικό) + JSON-LD description.

**Επιβεβαιώθηκε**: build OK, lint καθαρό, οπτικός έλεγχος (σωστός τόνος, defense-forward).

---

## Προτάσεις για την επόμενη φορά (8 → 9+)

1. **Ρόλοι στο terminal block: 9 → 4** — επιλογή των ισχυρότερων (θέλει δική σου απόφαση, είναι identity)
2. **Skills curation** — top 6-8 items ανά κάρτα, τα υπόλοιπα συμπτυγμένα
3. **SQL injection lab writeup** — το εκκρεμές case study· αυτό ανεβάζει το portfolio κατηγορία
4. **Mobile menu** — το λευκό sheet σπάει το dark theme (αν είναι σκόπιμο, αγνόησέ το)
5. Custom domain (π.χ. .dev) + analytics (GoatCounter/Plausible, δωρεάν & private)
