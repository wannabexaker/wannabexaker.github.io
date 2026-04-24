import { Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-black/40">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-mono text-primary">&gt; exit_</p>
        <p className="text-center">Built by Ioannis · wannabexaker.github.io · 2025</p>
        <a
          href="https://github.com/wannabexaker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile"
          className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors duration-200 hover:border-primary/50 hover:text-primary md:mx-0"
        >
          <Code2 className="size-5" />
        </a>
      </div>
    </footer>
  );
}
