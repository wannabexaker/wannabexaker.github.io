"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Code2, Shield, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

const roles = [
  "Network Engineer",
  "Penetration Tester",
  "Purple Team Operator",
  "Full Stack Developer",
];

const socialLinks = [
  { href: "https://github.com/wannabexaker", label: "GitHub", icon: Code2 },
  { href: "#contact", label: "Contact", icon: Terminal },
  { href: "#skills", label: "Skills", icon: Shield },
];

export function HeroBlock() {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  useEffect(() => {
    if (reducedMotion) {
      setTypedText(currentRole);
      return;
    }

    setTypedText("");
    let charIndex = 0;

    const typing = setInterval(() => {
      charIndex += 1;
      setTypedText(currentRole.slice(0, charIndex));

      if (charIndex >= currentRole.length) {
        clearInterval(typing);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 1200);
      }
    }, 55);

    return () => clearInterval(typing);
  }, [currentRole, reducedMotion]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 136, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 95%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 text-center">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35 }}
          className="font-mono text-sm text-primary"
        >
          &gt; initializing_profile()
        </motion.p>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.05 }}
          className="font-mono text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Ioannis
        </motion.h1>

        <div className="min-h-8 font-mono text-xl text-secondary sm:text-2xl">
          {typedText}
          {!reducedMotion && <span className="terminal-cursor" aria-hidden="true" />}
        </div>

        <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Network engineer, penetration tester &amp; full-stack developer.
          I design, build, and secure it all — also I break things to understand them, then build them better.
        </p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.1 }}
          className="rounded-xl border border-primary/35 bg-black/70 px-6 py-5 text-left font-mono text-sm leading-6 text-primary shadow-[0_0_35px_rgba(0,255,136,0.15)]"
        >
          <pre className="text-center leading-relaxed">{`+--------------------+
|        /o/         |
|   Ioannis Dimos    |
|    wannabexaker    |
+--------------------+`}</pre>
        </motion.div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-md bg-primary px-6 text-black hover:bg-primary/85">
            <Link href="#projects">View Projects</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-md border-secondary/40 bg-black/40 px-6 text-foreground hover:bg-secondary/10"
          >
            <a href="https://github.com/wannabexaker" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                title={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors duration-200 hover:border-primary/50 hover:text-primary"
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>

        <Link
          href="#about"
          aria-label="Scroll to About section"
          className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/35 text-primary transition-colors duration-200 hover:bg-primary/10"
        >
          <ChevronDown className="size-6 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
