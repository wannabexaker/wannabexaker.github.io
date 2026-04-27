import { Code2, Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">&gt; contact_</h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        Open to security collaborations, network infrastructure projects, IoT deployments,
        freelance dev work, and interesting problems — remote or on-site in Greece.
      </p>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
        <a
          href="https://github.com/wannabexaker"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="h-full border-border/80 bg-card/80 transition-colors duration-200 group-hover:border-primary/45 group-hover:bg-primary/5">
            <CardContent className="flex h-full min-h-28 items-center justify-center gap-3 p-6 font-mono text-foreground">
              <Code2 className="size-5 text-primary" />
              GitHub
            </CardContent>
          </Card>
        </a>

        <a
          href="https://www.linkedin.com/in/jiannisnw/"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="h-full border-border/80 bg-card/80 transition-colors duration-200 group-hover:border-blue-500/45 group-hover:bg-blue-500/5">
            <CardContent className="flex h-full min-h-28 items-center justify-center gap-3 p-6 font-mono text-foreground">
              <svg className="size-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </CardContent>
          </Card>
        </a>

        <a href="mailto:dimos.is.dev@gmail.com" className="group">
          <Card className="h-full border-border/80 bg-card/80 transition-colors duration-200 group-hover:border-secondary/45 group-hover:bg-secondary/5">
            <CardContent className="flex h-full min-h-28 items-center justify-center gap-3 p-6 font-mono text-foreground">
              <Mail className="size-5 text-secondary" />
              Email
            </CardContent>
          </Card>
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">Based in Greece · Available for remote work</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground/50">Self-taught with real deployments &gt; paper cert</p>
    </section>
  );
}
