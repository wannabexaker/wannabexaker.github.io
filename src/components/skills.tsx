import { Cpu, Code2, Database, Globe, Lock, Network, Radio, Shield, Terminal, VenetianMask, Wrench, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SkillCard = {
  title: string;
  accent: string;
  glow: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const cards: SkillCard[] = [
  {
    title: "Offensive Security",
    accent: "hover:border-red-500/60",
    glow: "hover:shadow-[0_0_22px_rgba(239,68,68,0.30)]",
    icon: Shield,
    items: [
      "Penetration Testing",
      "Web App Security Testing",
      "SQL Injection Assessment & Remediation",
      "Exploitation",
      "Privilege Escalation",
      "Network Scanning",
      "Burp Suite · Metasploit",
    ],
  },
  {
    title: "Social Engineering & Physical",
    accent: "hover:border-purple-500/60",
    glow: "hover:shadow-[0_0_22px_rgba(168,85,247,0.30)]",
    icon: VenetianMask,
    items: [
      "Pretexting & Impersonation",
      "Elicitation & Trust Building",
      "Phishing / Vishing Campaigns",
      "Rubber Ducky / BadUSB (HID Injection)",
      "RFID / NFC Cloning & Access Bypass",
      "Physical Access Testing",
      "OSINT",
    ],
  },
  {
    title: "Defensive / Blue Team",
    accent: "hover:border-secondary/60",
    glow: "hover:shadow-[0_0_22px_rgba(9,180,232,0.28)]",
    icon: Lock,
    items: [
      "Threat Detection",
      "SIEM",
      "Incident Response",
      "Log Analysis",
      "IDS/IPS",
      "Security Hardening",
    ],
  },
  {
    title: "Purple Team",
    accent: "hover:border-primary/60",
    glow: "hover:shadow-[0_0_22px_rgba(0,255,136,0.28)]",
    icon: Cpu,
    items: [
      "Attack Simulation",
      "Detection Engineering",
      "MITRE ATT&CK",
      "Red/Blue Collaboration",
      "TTPs",
    ],
  },
  {
    title: "Networking",
    accent: "hover:border-secondary/60",
    glow: "hover:shadow-[0_0_22px_rgba(9,180,232,0.28)]",
    icon: Network,
    items: [
      "OSPF Multi-Area Design",
      "BGP Peering & Policy Control",
      "MikroTik / RouterOS",
      "Complex VLANs · 802.1Q",
      "VPN (IPsec / WireGuard / OVPN)",
      "802.1X / NAC",
      "QoS Traffic Shaping",
      "Network Automation (Python)",
    ],
  },
  {
    title: "Full Stack Dev",
    accent: "hover:border-primary/60",
    glow: "hover:shadow-[0_0_22px_rgba(0,255,136,0.28)]",
    icon: Code2,
    items: [
      "TypeScript · React · Next.js",
      "C# / .NET",
      "Python",
      "Node.js · Nest.js",
      "PostgreSQL · MSSQL",
      "Docker",
      "AI Integration",
    ],
  },
  {
    title: "Tools & Platforms",
    accent: "hover:border-muted-foreground/60",
    glow: "hover:shadow-[0_0_22px_rgba(100,116,139,0.30)]",
    icon: Terminal,
    items: [
      "Kali Linux",
      "Burp Suite",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "Nessus",
      "Suricata IDS",
      "Grafana + Prometheus",
      "Proxmox",
    ],
  },
  {
    title: "Wireless & RF",
    accent: "hover:border-secondary/60",
    glow: "hover:shadow-[0_0_22px_rgba(9,180,232,0.28)]",
    icon: Radio,
    items: [
      "Microwave P2P Links (18GHz–90GHz)",
      "LoRa (868MHz / 915MHz)",
      "wMBUS (868MHz)",
      "WiFi (802.11 a/b/g/n/ac/ax)",
      "Antenna Alignment & Fresnel Zone",
      "Frequency Planning & Spectrum Analysis",
      "SDR (Software Defined Radio)",
      "QPSK / OFDM / QAM Modulation",
    ],
  },
  {
    title: "Embedded & Hardware",
    accent: "hover:border-primary/60",
    glow: "hover:shadow-[0_0_22px_rgba(0,255,136,0.28)]",
    icon: Zap,
    items: [
      "Raspberry Pi · Arduino",
      "ESP32 (Wi-Fi / BLE Edge Nodes)",
      "IoT Device Deployment",
      "CCTV Installations & Programming",
      "Smart Metering / Energy Monitoring",
      "Modbus RTU/TCP",
      "RS-485 / RS-232 Industrial Bus",
    ],
  },
  {
    title: "Field & Infrastructure",
    accent: "hover:border-secondary/60",
    glow: "hover:shadow-[0_0_22px_rgba(9,180,232,0.28)]",
    icon: Wrench,
    items: [
      "Fiber Optic Splicing & Installation",
      "PON Activation",
      "OTDR Testing",
      "Photovoltaic Systems",
      "GIS Network Design",
      "Network Site Surveys",
    ],
  },
];

const extraIcons = [Globe, Database];

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">&gt; skills_</h2>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const Extra = extraIcons[index % extraIcons.length];

          return (
            <Card
              key={card.title}
              className={`group relative overflow-hidden border-border/90 bg-card/85 transition-all duration-200 ${card.accent} ${card.glow}`}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  animation: "scanlineShift 2s linear infinite",
                }}
              />
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-3 font-mono text-base text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Icon className="size-5 text-primary" />
                    <span className="glitch-hover">{card.title}</span>
                  </span>
                  <Extra className="size-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {card.items.map((item) => (
                    <li key={item} className="rounded-md bg-black/25 px-2 py-1.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
