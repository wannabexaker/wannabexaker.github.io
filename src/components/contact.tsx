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

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
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

        <a href="mailto:placeholder@email.com" className="group">
          <Card className="h-full border-border/80 bg-card/80 transition-colors duration-200 group-hover:border-secondary/45 group-hover:bg-secondary/5">
            <CardContent className="flex h-full min-h-28 items-center justify-center gap-3 p-6 font-mono text-foreground">
              <Mail className="size-5 text-secondary" />
              Email
            </CardContent>
          </Card>
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">Based in Greece · Available for remote work</p>
    </section>
  );
}
