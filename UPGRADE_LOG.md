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
