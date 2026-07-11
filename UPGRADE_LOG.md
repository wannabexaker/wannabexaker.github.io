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
