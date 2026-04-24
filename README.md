# Portfolio — Ioannis (wannabexaker)

Professional portfolio for **Ioannis**, network engineer, penetration tester, and full-stack developer.

**Live:** https://wannabexaker.github.io

---

## Tech Stack

- **Next.js 15** (App Router, static export)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** (animations)
- **Lucide React** (icons)

---

## Local Development

```bash
cd wannabexaker.github.io

# Install dependencies
npm install

# Run dev server
npm run dev

# Build static export
npm run build

# Preview production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view.

---

## Deployment

GitHub Actions workflow automatically deploys to GitHub Pages on push to `main`.

`.github/workflows/deploy.yml` handles:
- Building Next.js static export
- Uploading to GitHub Pages
- Automatic re-deployment on commits

---

## License

This project is licensed under the **Free Personal Use License (FPUL)**.

### Permitted:
✅ Personal use and study  
✅ Running locally for reference  
✅ Learning from source code

### Prohibited:
❌ Commercial use or monetization  
❌ Redistribution or resale  
❌ Modification and re-distribution  
❌ Use as a template for clients/third parties  
❌ Removing copyright notices

**Full license:** See [LICENSE](./LICENSE) file.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout + fonts
│   ├── page.tsx           # Assembles all sections
│   └── globals.css        # Dark theme + animations
├── components/
│   ├── hero-block.tsx     # Hero section with typing animation
│   ├── about.tsx          # Bio + terminal window
│   ├── skills.tsx         # Skill cards grid
│   ├── projects.tsx       # Project cards + live GitHub API
│   ├── contact.tsx        # Contact links
│   ├── footer.tsx         # Footer
│   ├── navbar.tsx         # Fixed navigation
│   └── ui/                # shadcn components
└── lib/
    └── utils.ts           # Utility functions
```

---

## Customization

### Update Content
Edit component files in `src/components/`:
- Hero subtitle: `hero-block.tsx`
- About bio: `about.tsx`
- Terminal block: `about.tsx`
- Skills cards: `skills.tsx`
- Projects: `projects.tsx`
- Contact info: `contact.tsx`

### Design System
All colors and typography defined in:
- `src/app/globals.css` (CSS variables)
- `tailwind.config.ts`
- Component className patterns

---

## Portfolio Licensing Strategy

For information on licensing multiple repos (proprietary vs. open source), see:
[REPO_LICENSING_PLANNING_PROMPT.md](./REPO_LICENSING_PLANNING_PROMPT.md)

---

## Contact

- GitHub: https://github.com/wannabexaker
- Portfolio: https://wannabexaker.github.io
