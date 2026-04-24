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
};

const fallbackProjects: Project[] = [
  {
    id: 1,
    title: "Web App Security Hardening Pipeline",
    description: "Authorized SQL injection assessment workflow with remediation and regression validation.",
    url: "https://github.com/wannabexaker",
    year: "2025",
    image: "https://picsum.photos/seed/webapp-sqli-hardening/800/500",
  },
  {
    id: 2,
    title: "Wi-Fi Security Assessment Lab",
    description: "Controlled wireless resilience testing with traffic analysis and post-assessment hardening.",
    url: "https://github.com/wannabexaker",
    year: "2024",
    image: "https://picsum.photos/seed/wifi-security-assessment/800/500",
  },
  {
    id: 3,
    title: "CCTV & Signal Center Integration",
    description: "End-to-end installation, programming, and monitoring integration for security camera systems.",
    url: "https://github.com/wannabexaker",
    year: "2025",
    image: "https://picsum.photos/seed/cctv-signal-center/800/500",
  },
  {
    id: 4,
    title: "Smart Home Energy Automation",
    description: "IoT automation scenarios for metering, optimization, and energy-efficient smart spaces.",
    url: "https://github.com/wannabexaker",
    year: "2024",
    image: "https://picsum.photos/seed/smart-home-energy-automation/800/500",
  },
  {
    id: 5,
    title: "Microwave Link Infrastructure",
    description: "Planning and deployment of 20–80GHz P2P microwave links with azimuth alignment.",
    url: "https://github.com/wannabexaker",
    year: "2024",
    image: "https://picsum.photos/seed/microwave-links/800/500",
  },
];

function mapReposToProjects(repos: GitHubRepo[]): Project[] {
  return repos.slice(0, 4).map((repo) => ({
    id: repo.id,
    title: repo.name,
    description:
      repo.description ?? "Cybersecurity and software engineering project from wannabexaker.",
    url: repo.html_url,
    year: new Date(repo.created_at).getFullYear().toString(),
    image: `https://picsum.photos/seed/${encodeURIComponent(repo.name)}/800/500`,
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
        const selected = repos
          .filter((repo) => !repo.fork)
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }

            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });

        if (!ignore && selected.length >= 1) {
          const nextProjects = mapReposToProjects(selected);
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
