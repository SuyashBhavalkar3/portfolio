import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResumeSection } from "@/components/ResumeSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <TimelineSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
