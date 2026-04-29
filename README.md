# wannabexaker.github.io

Personal portfolio site for Ioannis — network engineer, penetration tester, and full-stack developer

## Overview

Statically exported Next.js site deployed to GitHub Pages. All content is hardcoded in component files — there is no CMS, no database, and no server. The Projects section fetches live GitHub repository data client-side and falls back to a hardcoded list if the API is unavailable.

**Live:** https://wannabexaker.github.io

## Features

- Single-page layout with five content sections: Hero, About, Skills, Projects, Contact
- Client-side GitHub API fetch on mount — loads the four pinned repos (PMD, SafestNotes, skycode, The_Eye_in_the_Sky) with graceful fallback to hardcoded data
- Framer Motion animations with `useReducedMotion()` support — animations are skipped when the OS accessibility setting is active
- Dark terminal aesthetic with custom CSS classes (`terminal-title`, `glitch-hover`, `scanlines`, `terminal-cursor`)
- GitHub Actions CI/CD — pushes to `main` trigger a full build and deploy to GitHub Pages

## Architecture

`src/app/page.tsx` assembles all sections in a fixed order. Each section is an independent client component with no shared state. The GitHub API call in `ProjectsSection` runs in a `useEffect`, leaves the fallback array in place on failure, and ignores the result if the component unmounts before the fetch completes.

### Components

| Component | Role |
|---|---|
| `hero-block.tsx` | Hero section — typing animation, ASCII art |
| `about.tsx` | Bio card and styled terminal window block |
| `skills.tsx` | Skill cards grid |
| `projects.tsx` | Project cards — GitHub API fetch with hardcoded fallback |
| `contact.tsx` | Contact links |
| `navbar.tsx` | Fixed top navigation |
| `footer.tsx` | Footer |
| `src/components/ui/` | shadcn/ui base components |

## Tech Stack

| Technology | Role |
|---|---|
| Next.js 16.2.4 | Framework, static export |
| React 19 | Component model |
| TypeScript 5 | Type safety |
| Tailwind CSS v4 | Utility styles |
| shadcn/ui | Base UI components |
| Framer Motion | Animations |
| Lucide React | Icons |
| tw-animate-css | CSS animation utilities |
| GitHub Actions | CI/CD pipeline |

## Installation

```bash
git clone https://github.com/wannabexaker/wannabexaker.github.io
cd wannabexaker.github.io
npm install
```

## Usage

```bash
npm run dev
```

Dev server starts at `http://localhost:3000`.

```bash
npm run build
```

Produces a static export in `/out`. Required before deploying manually.

```bash
npm start
```

Serves the `/out` build locally for production preview.

## Project Structure

```
wannabexaker.github.io/
├── src/
│   ├── app/
│   │   ├── page.tsx          — root page, assembles all sections
│   │   ├── layout.tsx        — root layout, fonts
│   │   └── globals.css       — dark theme CSS variables, custom classes
│   ├── components/
│   │   ├── hero-block.tsx    — hero section
│   │   ├── about.tsx         — bio + terminal block
│   │   ├── skills.tsx        — skills grid
│   │   ├── projects.tsx      — projects with GitHub API fetch
│   │   ├── contact.tsx       — contact links
│   │   ├── navbar.tsx        — fixed navigation
│   │   ├── footer.tsx        — footer
│   │   └── ui/               — shadcn/ui components
│   └── lib/
│       └── utils.ts          — utility functions
├── public/
│   └── screenshots/          — project preview images
├── .github/
│   └── workflows/
│       └── deploy.yml        — build and deploy to GitHub Pages
├── next.config.ts            — static export config
└── package.json
```

## Notes

`next.config.ts` sets `output: "export"` and `images.unoptimized: true`. Static export means no API routes, no server components that fetch at request time, and no ISR. The GitHub API call in `projects.tsx` is deliberately client-side to work around this constraint.

Project descriptions in the Projects section come from the `fallbackProjects` array in `projects.tsx`, not from GitHub API responses. The API is used only for metadata (repo ID, URL, creation date) while description copy is controlled locally.

Deployment is fully automated: any push to `main` triggers the GitHub Actions workflow, which runs `npm ci`, `npm run build`, and uploads `/out` to GitHub Pages via the official `actions/deploy-pages` action.

## License

Free Personal Use License (FPUL) — see [LICENSE](./LICENSE) for permitted and prohibited uses.
