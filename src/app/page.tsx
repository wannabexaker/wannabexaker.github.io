import { AboutSection } from "@/components/about";
import { ContactSection } from "@/components/contact";
import { Footer } from "@/components/footer";
import { HeroBlock } from "@/components/hero-block";
import { Navbar } from "@/components/navbar";
import { ProjectsSection } from "@/components/projects";
import { SkillsSection } from "@/components/skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroBlock />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
