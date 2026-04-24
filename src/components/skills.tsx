import { Cpu, Code2, Database, Globe, Lock, Network, Radio, Shield, Terminal, Wrench, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SkillCard = {
  title: string;
  accent: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
};

const cards: SkillCard[] = [
  {
    title: "Offensive Security",
    accent: "hover:border-red-500/60",
    icon: Shield,
    items: [
      "Penetration Testing",
      "Network Scanning",
      "Web App Security Testing",
      "SQL Injection Assessment & Remediation",
      "Exploitation",
      "Privilege Escalation",
      "Social Engineering",
      "Metasploit",
      "Burp Suite",
    ],
  },
  {
    title: "Defensive / Blue Team",
    accent: "hover:border-secondary/60",
    icon: Lock,
    items: [
      "Threat Detection",
      "SIEM",
      "Incident Response",
      "Log Analysis",
      "Firewall Management",
      "IDS/IPS",
      "Security Hardening",
    ],
  },
  {
    title: "Purple Team",
    accent: "hover:border-primary/60",
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
    icon: Network,
    items: [
      "TCP/IP",
      "Routing & Switching",
      "Complex VLANs",
      "VPN (IPsec / WireGuard / OVPN)",
      "MikroTik / RouterOS",
      "Captive Portal",
      "Packet Analysis",
      "Wireshark",
      "Nmap",
      "Network Automation",
      "Firewall Design",
      "MPLS",
      "802.1X / NAC",
      "WPA2/WPA3 Enterprise",
      "OSPF Multi-Area Design",
      "BGP Peering & Policy Control",
      "QoS Traffic Shaping",
    ],
  },
  {
    title: "Full Stack Dev",
    accent: "hover:border-primary/60",
    icon: Code2,
    items: [
      "React",
      "Next.js",
      "Nest.js",
      "TypeScript",
      "JavaScript",
      "C#",
      ".NET",
      "Node.js",
      "Python",
      "REST APIs",
      "MSSQL",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "AI Integration",
      "Java Spring Boot",
      "Rust (basics)",
    ],
  },
  {
    title: "Tools & Platforms",
    accent: "hover:border-muted-foreground/60",
    icon: Terminal,
    items: [
      "Kali Linux",
      "ParrotOS",
      "Burp Suite",
      "Metasploit",
      "Nessus",
      "OWASP ZAP",
      "Hashcat",
      "Crunch",
      "Suricata IDS",
      "Grafana + Prometheus",
      "GitHub",
      "VS Code",
      "Visual Studio",
      "Proxmox",
      "ArcGIS",
      "AutoCAD",
    ],
  },
  {
    title: "Wireless & RF",
    accent: "hover:border-secondary/60",
    icon: Radio,
    items: [
      "NFC (13.56MHz)",
      "Sub-GHz RF — 12.5KHz, 434MHz, 868MHz",
      "LoRa (868MHz / 915MHz)",
      "wMBUS (868MHz)",
      "WiFi — 2.4GHz, 5GHz, 6GHz (802.11 a/b/g/n/ac/ax)",
      "Microwave P2P Links (18GHz–90GHz)",
      "Antenna Alignment, Azimuth & Fresnel Zone",
      "Frequency Planning & Spectrum Analysis",
      "Smart Home / IoT",
      "Authorized Wi-Fi Deauth Resilience Testing",
      "Airodump-ng Capture Analysis (Authorized)",
      "SDR (Software Defined Radio)",
      "QPSK / OFDM / QAM Modulation",
    ],
  },
  {
    title: "Embedded & Hardware",
    accent: "hover:border-primary/60",
    icon: Zap,
    items: [
      "Raspberry Pi",
      "Arduino",
      "Electronics",
      "Firmware Basics",
      "Hardware Integration",
      "IoT Device Deployment",
      "CCTV Installations & Programming",
      "Signal Center Integration",
      "Smart Metering / Energy Monitoring",
      "ESP32 (Wi-Fi / BLE Edge Nodes)",
      "Modbus RTU/TCP",
      "RS-485 Industrial Bus",
      "RS-232",
    ],
  },
  {
    title: "Field & Infrastructure",
    accent: "hover:border-secondary/60",
    icon: Wrench,
    items: [
      "Fiber Optic Splicing & Installation",
      "PON Activation",
      "Photovoltaic Systems",
      "Basic Electrical Installations",
      "Microwave P2P Links",
      "GIS Network Design",
      "Network Site Surveys",
      "AutoCAD",
      "OTDR (Optical Time-Domain Reflectometer)",
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
              className={`group relative overflow-hidden border-border/90 bg-card/85 transition-colors duration-200 ${card.accent}`}
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
                    {card.title}
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
