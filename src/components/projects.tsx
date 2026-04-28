"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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
};

const fallbackProjects: Project[] = [
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
    id: 2,
    title: "SafestNotes",
    description: "Encrypted local notes app for Android — zero-network, privacy-first note storage.",
    url: "https://github.com/wannabexaker/SafestNotes",
    year: "2026",
    image: "/screenshots/safestnotes.jpg",
  },
  {
    id: 3,
    title: "skycode",
    description: "Offline-first AI coding agent — tool calling, file ops, git, multi-agent workflows, 100% local via Ollama.",
    url: "https://github.com/wannabexaker/skycode",
    year: "2026",
    image: "/screenshots/Sky-code.png",
  },
  {
    id: 4,
    title: "The Eye in the Sky",
    description: "Aerial intelligence and monitoring system integrating UAV feeds with signal analysis.",
    url: "https://github.com/wannabexaker/The_Eye_in_the_Sky",
    year: "2026",
    image: "/screenshots/The_Eye_in_the_Sky.png",
  },
];

const repoScreenshots: Record<string, { image: string; objectPosition?: string }> = {
  PMD: { image: "/screenshots/pmd.png", objectPosition: "65% center" },
  SafestNotes: { image: "/screenshots/safestnotes.jpg" },
  "skycode": { image: "/screenshots/Sky-code.png" },
  "The_Eye_in_the_Sky": { image: "/screenshots/The_Eye_in_the_Sky.png" },
};

function mapReposToProjects(repos: GitHubRepo[]): Project[] {
  return repos.slice(0, 4).map((repo) => ({
    id: repo.id,
    title: repo.name,
    description:
      repo.description ?? "Cybersecurity and software engineering project from wannabexaker.",
    url: repo.html_url,
    year: new Date(repo.created_at).getFullYear().toString(),
    image:
      repoScreenshots[repo.name]?.image ??
      `https://opengraph.githubassets.com/1/wannabexaker/${encodeURIComponent(repo.name)}`,
    objectPosition: repoScreenshots[repo.name]?.objectPosition,
  }));
}

export function ProjectsSection() {
  const reducedMotion = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [activeId, setActiveId] = useState<number>(fallbackProjects[0]?.id ?? 1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        const PINNED = ["PMD", "SafestNotes", "skycode", "The_Eye_in_the_Sky"];
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
              <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block p-5">
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
    </section>
  );
}
