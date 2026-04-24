import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">&gt; about_me</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/20 bg-card/80">
          <CardContent className="p-6 sm:p-8">
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              I&apos;m a network engineer and penetration tester based in Greece, with a purple team
              mindset — I think like an attacker, defend like an engineer.

              My core is networking: MikroTik infrastructure, complex VLANs, VPN tunnels, BGP,
              OSPF, QoS, and full network automation. On the security side I run authorized
              assessments — web app, wireless, infrastructure — then stay to harden what I found.

              In the field I work across the full RF spectrum (12.5KHz–90GHz): LoRa, wMBUS,
              microwave P2P links, WiFi deployments, antenna alignment, and spectrum analysis.
              I also handle fiber splicing, PON activation, CCTV integration, smart home energy
              automation, and photovoltaic installations.

              On the dev side I build full-stack applications with React, Next.js, C#, and Python
              — backed by Docker, MSSQL, and PostgreSQL — and integrate AI where it genuinely
              adds value.

              Down at the hardware level I design and build complete systems: custom workstations,
              watercooling, servers, embedded devices with RPi and Arduino, and IoT deployments
              planned with GIS from site survey to activation.

              If it runs on electrons, I've probably worked on it.
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
> Network Engineer (MikroTik / VLAN / VPN)
> Penetration Tester
> Purple Team Operator
> Full Stack Developer
> IoT & RF Systems Engineer
> Embedded Systems (RPi / Arduino)
> Security Systems Integrator (CCTV / Signal Center)
> Smart Home Energy Automation Engineer
> Field Technician (Microwave / Fiber / PV)
$ locate passion
/usr/bin/hacking
/usr/bin/building
/usr/bin/deploying
/field/antenna_alignment
/field/spectrum_analyser
/field/wireless_coverage_and_efficiency
/field/cctv_commissioning
/lab/security_validation_and_hardening
/iot/green_automation
$ _`}</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
