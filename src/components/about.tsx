import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">&gt; about_me</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/20 bg-card/80">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              I&apos;m a network engineer and cybersecurity analyst based in Greece, with a purple team
              mindset — I think like an attacker, defend like an engineer.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              My core is networking: MikroTik infrastructure, complex VLANs, VPN tunnels, BGP,
              OSPF, QoS, and full network automation. On the security side I run authorized
              assessments — web app, wireless, infrastructure, plus social engineering and physical
              access (badge cloning, BadUSB, pretexting) — then stay to harden what I found.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              In the field I work across the full RF spectrum (12.5KHz–90GHz): LoRa, wMBUS,
              microwave P2P links, WiFi deployments, antenna alignment, and spectrum analysis.
              I also handle fiber splicing, PON activation, CCTV integration, smart home energy
              automation, and photovoltaic installations.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              On the dev side I build full-stack applications with React, Next.js, C#, and Python
              — backed by Docker, MSSQL, and PostgreSQL — and integrate AI where it genuinely
              adds value. Down at the hardware level I design and build complete systems: custom
              workstations, watercooling, servers, embedded devices with RPi and Arduino, and IoT
              deployments planned with GIS from site survey to activation.
            </p>
            <p className="max-w-prose text-base font-medium leading-8 text-primary/90 sm:text-lg">
              If it runs on electrons, I&apos;ve probably worked on it.
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-[#0d1117] scanlines">
          <CardHeader>
            <CardTitle className="font-mono text-primary">terminal://session</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="font-mono text-sm leading-7 text-[#d2e5dc]">{`$ whoami
ioannis
$ cat roles.txt
> Network Engineer      (MikroTik / VLAN / BGP)
> Cybersecurity Analyst (Purple Team)
> Wireless Telecoms     (Microwave / LoRa / RF)
> Full Stack Developer  (TypeScript / C# / Python)
$ cat also.txt
IoT & embedded · CCTV · fiber/PON · PV & energy automation
$ locate passion
/usr/bin/hacking
/usr/bin/building
/usr/bin/deploying
/field/antenna_alignment
/lab/security_hardening
$ _`}</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
