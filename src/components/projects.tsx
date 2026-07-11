"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
};

type Project = {
  id: number;
  title: string;
  description: string;
  url: string;
  year: string;
  image: string;
  objectPosition?: string;
  video?: string;
};

const fallbackProjects: Project[] = [
  {
    id: 3,
    title: "NetSentry",
    description: "Telegram-based monitoring & control for MikroTik networks — real-time alerts, client management, guest WiFi rotation with QR codes, automated config backups. Python + Raspberry Pi.",
    url: "https://github.com/wannabexaker/NetSentry",
    year: "2026",
    image: "/screenshots/NetSentry.jpg",
    video: "/videos/netsentry.mp4",
  },
  {
    id: 2,
    title: "SafestNotes",
    description: "Encrypted local notes app for Android — zero-network, privacy-first note storage.",
    url: "https://github.com/wannabexaker/SafestNotes",
    year: "2026",
    image: "/screenshots/safestnotes.jpg",
  },
  {
    id: 1,
    title: "PMD — Project Manager Desktop",
    description: "Local project management desktop app with colored task tracking and workflow automation.",
    url: "https://github.com/wannabexaker/PMD",
    year: "2026",
    image: "/screenshots/pmd.png",
    objectPosition: "65% center",
  },
  {
    id: 4,
    title: "The Eye in the Sky",
    description: "Full-stack slot simulation platform — React player shell, admin panel, math engine validation, and Node.js API.",
    url: "https://github.com/wannabexaker/The_Eye_in_the_Sky",
    year: "2026",
    image: "/screenshots/The_Eye_in_the_Sky.png",
  },
];

const repoScreenshots: Record<string, { image: string; objectPosition?: string; video?: string }> = {
  PMD: { image: "/screenshots/pmd.png", objectPosition: "65% center" },
  SafestNotes: { image: "/screenshots/safestnotes.jpg" },
  "NetSentry": { image: "/screenshots/NetSentry.jpg", video: "/videos/netsentry.mp4" },
  "The_Eye_in_the_Sky": { image: "/screenshots/The_Eye_in_the_Sky.png" },
};

export function ProjectsSection() {
  const reducedMotion = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeId, setActiveId] = useState<number>(fallbackProjects[0]?.id ?? 1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoProject, setVideoProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!videoProject) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setVideoProject(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [videoProject]);

  useEffect(() => {
    let ignore = false;

    async function loadRepos() {
      try {
        const response = await fetch(
          "https://api.github.com/users/wannabexaker/repos?per_page=100&sort=updated",
        );

        if (!response.ok) {
          return;
        }

        const repos = (await response.json()) as GitHubRepo[];
        const PINNED = ["NetSentry", "SafestNotes", "PMD", "The_Eye_in_the_Sky"];
        const byName = Object.fromEntries(repos.map((r) => [r.name, r]));
        const fallbackByName = Object.fromEntries(
          fallbackProjects.map((p) => [p.url.split("/").pop() ?? "", p])
        );

        const nextProjects: Project[] = PINNED.map((name) => {
          const repo = byName[name];
          const fallback = fallbackByName[name];
          if (repo) {
            return {
              id: repo.id,
              title: repo.name,
              description: fallback?.description ?? repo.description ?? "Cybersecurity and software engineering project from wannabexaker.",
              url: repo.html_url,
              year: new Date(repo.created_at).getFullYear().toString(),
              image: repoScreenshots[repo.name]?.image ?? `https://opengraph.githubassets.com/1/wannabexaker/${encodeURIComponent(repo.name)}`,
              objectPosition: repoScreenshots[repo.name]?.objectPosition,
              video: repoScreenshots[repo.name]?.video,
            };
          }
          return fallback ?? null;
        }).filter(Boolean) as Project[];

        if (!ignore && nextProjects.length >= 1) {
          setProjects(nextProjects);
          setActiveId(nextProjects[0]?.id ?? fallbackProjects[0]?.id ?? 1);
        }
      } catch {
        // Keep fallback projects if API fails.
      }
    }

    loadRepos();

    return () => {
      ignore = true;
    };
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? projects[0],
    [activeId, projects],
  );

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }}
    >
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">
        &gt; selected_projects_
      </h2>

      {/* Featured: EM Spectrum */}
      <a
        href="/em-spectrum/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-8 block overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/7 via-black/70 to-secondary/8 p-6 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_38px_rgba(0,255,136,0.16)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,136,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none [background:linear-gradient(transparent_49%,rgba(255,255,255,0.08)_50%,transparent_51%)] [background-size:100%_6px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                Featured
              </span>
              <span className="font-mono text-xs text-muted-foreground">2026</span>
            </div>
            <h3 className="mt-2 font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              EM Spectrum Explorer
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Interactive electromagnetic spectrum atlas — explore RF bands, wireless technologies, modulation types, and frequency phenomena with WebGL zoom/pan canvas. Educational &amp; professional modes.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-sm text-primary opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
              Open live demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block"><path d="M6 3h7v7M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div className="relative w-full max-w-sm shrink-0 overflow-hidden rounded-lg border border-secondary/35 bg-black/75 p-3 shadow-[0_0_24px_rgba(14,165,233,0.12)]">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-secondary/80">spectrum.live</span>
            </div>
            <div className="relative h-24 overflow-hidden rounded border border-white/10 bg-black/70">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#1e40af_0%,#0ea5e9_18%,#22d3ee_30%,#22c55e_46%,#eab308_61%,#f97316_76%,#ef4444_92%,#7f1d1d_100%)] opacity-80" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.45),transparent_24%)] mix-blend-screen" />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.8)] left-[62%] group-hover:left-[76%] transition-all duration-500" />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              <span>1 Hz</span>
              <span>10^6</span>
              <span>10^12</span>
              <span>10^18</span>
              <span>10^26 Hz</span>
            </div>
          </div>
        </div>
      </a>

      {/* Featured: MCQ Trainer */}
      <a
        href="/mcq-trainer/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-5 block overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-secondary/8 via-black/70 to-primary/7 p-6 transition-all duration-300 hover:border-primary/70 hover:shadow-[0_0_38px_rgba(0,255,136,0.16)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.10),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none [background:linear-gradient(transparent_49%,rgba(255,255,255,0.08)_50%,transparent_51%)] [background-size:100%_6px]" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                Featured
              </span>
              <span className="font-mono text-xs text-muted-foreground">2026</span>
            </div>
            <h3 className="mt-2 font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              MCQ Trainer
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Multiple-choice question trainer with pre-built Networking / Cybersecurity / SQL / IT sets, bring-your-own <code className="font-mono text-xs">q_*.json</code> import, exam mode, practice mode, timer, and a built-in AI prompt to generate questions from any book or text. Offline-capable PWA, also shipped as a native Android APK.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-sm text-primary opacity-80 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
              Open live demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline-block"><path d="M6 3h7v7M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          <div className="relative w-full max-w-sm shrink-0 overflow-hidden rounded-lg border border-secondary/35 bg-black/75 p-3 shadow-[0_0_24px_rgba(14,165,233,0.12)]">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-wide text-secondary/80">mcq.live</span>
            </div>
            <div className="relative h-24 overflow-hidden rounded border border-white/10 bg-black/70 p-2 font-mono text-[9px] text-emerald-300/90">
              <div className="opacity-80">Q3. Which OSI layer handles end-to-end reliable delivery?</div>
              <div className="mt-1 flex flex-col gap-0.5">
                <div className="opacity-70">A. Network (3)</div>
                <div className="rounded bg-emerald-500/15 px-1 text-emerald-200">B. Transport (4) ✓</div>
                <div className="opacity-70">C. Session (5)</div>
              </div>
              <div className="absolute right-1 top-1 rounded bg-secondary/30 px-1 py-0.5 text-[8px] uppercase tracking-wider text-secondary">3/30</div>
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              <span>networking</span>
              <span>cyber</span>
              <span>sql</span>
              <span>it</span>
              <span>+import</span>
            </div>
          </div>
        </div>
      </a>

      <div className="relative mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`border transition-colors duration-200 ${
                activeId === project.id
                  ? "border-primary/60 bg-primary/5"
                  : "border-border/90 bg-card/80 hover:border-primary/40"
              }`}
              onMouseEnter={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex={0}
            >
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={project.video ? "block p-5 pb-3" : "block p-5"}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-base font-semibold text-foreground glitch-hover">
                    {project.title}
                  </h3>
                  <span className="rounded-full border border-secondary/30 px-2 py-1 font-mono text-xs text-secondary">
                    {project.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
              </Link>
              {project.video && (
                <div className="px-5 pb-4">
                  <button
                    type="button"
                    onClick={() => setVideoProject(project)}
                    className="inline-flex items-center gap-2 rounded-md border border-primary/40 px-3 py-1.5 font-mono text-xs text-primary transition-colors duration-200 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
                  >
                    <Play className="size-3.5" />
                    watch_demo
                  </button>
                </div>
              )}
            </Card>
          ))}

          <Button asChild variant="outline" size="lg" className="h-12 w-full border-primary/30 hover:bg-primary/10">
            <a href="https://github.com/wannabexaker" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>

        <div className="hidden min-h-[320px] overflow-hidden rounded-xl border border-primary/25 bg-black/70 lg:block">
          {activeProject && (
            <motion.img
              key={activeProject.id}
              src={activeProject.image}
              alt={`${activeProject.title} preview image`}
              className="h-full w-full object-cover"
              style={{ objectPosition: activeProject.objectPosition ?? "center" }}
              initial={reducedMotion ? false : { opacity: 0.6, scale: 1.02 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: reducedMotion ? 0 : (mousePosition.x - 400) * 0.01,
                y: reducedMotion ? 0 : (mousePosition.y - 280) * 0.01,
              }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {videoProject?.video && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => setVideoProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${videoProject.title} demo video`}
          >
            <motion.div
              className="relative w-fit max-w-[min(90vw,64rem)]"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm text-primary">
                  &gt; {videoProject.title} — demo_
                </span>
                <button
                  type="button"
                  onClick={() => setVideoProject(null)}
                  aria-label="Close video"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
                >
                  <X className="size-5" />
                </button>
              </div>
              <video
                src={videoProject.video}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] w-auto max-w-full rounded-xl border border-primary/30 bg-black shadow-[0_0_45px_rgba(0,255,136,0.12)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
