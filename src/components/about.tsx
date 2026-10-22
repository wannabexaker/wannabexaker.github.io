import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="terminal-title text-2xl font-semibold tracking-tight sm:text-3xl">&gt; about_me</h2>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-primary/20 bg-card/80">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              I&apos;m a full-stack developer, currently building C#&nbsp;/&nbsp;.NET and SQL Server
              features at PeopleCert. That&apos;s my focus today, and it sits on top of two decades of
              hands-on work across networks, telecommunications, wireless and IoT.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              I ship full-stack applications with C#&nbsp;/&nbsp;.NET, TypeScript, React and Next.js,
              backed by SQL Server and PostgreSQL and containerised with Docker. AI-assisted
              development is part of how I work every day: I script and automate with it, lean on a
              planning- and research-first method, and enjoy helping other developers use it well.
              I&apos;m methodical and well organised, work equally well solo or in a team, and bring a
              positive attitude.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              Underneath sits networking and telecommunications: MikroTik infrastructure, complex
              VLANs, VPN tunnels, BGP/OSPF and network automation, plus years of field and RF work,
              from microwave P2P links and LoRa/wMBUS metering to WiFi, antenna alignment and fiber /
              PON.
            </p>
            <p className="max-w-prose text-base leading-8 text-foreground/90 sm:text-lg">
              Security runs through all of it, but as a mindset and a skill rather than a job title: I
              design, test and harden what I build, from the application layer down to routers,
              wireless links and devices. It&apos;s an area I genuinely love and keep pushing to grow
              in.
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
> Full-Stack Developer   (C# / .NET · TypeScript · SQL)
> Network & Telecom Eng. (MikroTik / VLAN / BGP)
> Wireless & RF          (Microwave / LoRa / WiFi)
> IoT & Embedded         (RPi / Arduino / ESP32)
$ cat approach.txt
security-first mindset: design, build, test, harden
ai-assisted: daily since 2022, scripting & automation
$ locate focus
/usr/bin/building
/usr/bin/shipping
/field/networks_and_rf
/lab/secure_by_design
$ _`}</pre>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
