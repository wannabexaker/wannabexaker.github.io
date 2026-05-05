"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "/em-spectrum/", label: "EM Spectrum", external: true },
];

export function Navbar() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-primary/20 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="#hero"
          className="font-mono text-sm font-semibold tracking-wide text-primary glitch-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded"
        >
          &gt; ioannis<span className="terminal-cursor" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...("external" in link ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`font-mono text-sm transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 rounded ${
                "external" in link
                  ? "text-primary/80 border border-primary/25 px-2.5 py-1 rounded-full text-xs hover:bg-primary/10"
                  : "text-foreground/85"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors duration-200 hover:bg-muted/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetOverlay />
            <SheetContent
              side="right"
              className="border-l-2 border-primary/40 bg-white text-zinc-900 shadow-[-4px_0_32px_rgba(0,0,0,0.4)]"
            >
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="terminal-title text-xl">Menu</SheetTitle>
                  <SheetClose
                    aria-label="Close navigation menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors duration-200 hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
                  >
                    <X className="size-4" />
                  </SheetClose>
                </div>
                <SheetDescription className="mt-1 font-mono text-xs text-zinc-400">
                  // navigate to section
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((link, i) =>
                  "external" in link ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3.5 text-left font-mono text-sm text-primary transition-all duration-200 hover:border-primary/60 hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      <span className="font-mono text-xs text-primary/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto opacity-60"><path d="M6 3h7v7M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  ) : (
                    <SheetClose
                      key={link.href}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-left font-mono text-sm text-zinc-700 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                      onClick={() => {
                        window.location.hash = link.href;
                      }}
                    >
                      <span className="font-mono text-xs text-zinc-400 group-hover:text-primary/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </SheetClose>
                  )
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
