"use client";

import React from "react";
import IDEWindow from "@/components/IDEWindow";
import HeroFile from "@/components/HeroFile";
import ExperienceFile from "@/components/ExperienceFile";
import ProjectsFile from "@/components/ProjectsFile";
import SkillsFile from "@/components/SkillsFile";
import AchievementsFile from "@/components/AchievementsFile";
import ContactFile from "@/components/ContactFile";
import ResumeFile from "@/components/ResumeFile";
import GravityBackground from "@/components/GravityBackground";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 md:p-8 bg-[#090a0f] min-h-screen relative overflow-hidden">
      {/* Interactive Canvas Fluid Background */}
      <GravityBackground />
      {/* Floating abstract decorative elements (Antigravity float effect) */}
      <div className="absolute top-[8%] left-[85%] w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-[15%] left-[8%] w-2 h-2 bg-white/10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[65%] left-[4%] w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-[20%] left-[12%] w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />

      <main className="w-full max-w-[94vw] 2xl:max-w-[1200px] z-10 flex flex-col items-center px-4 md:px-8">
        <IDEWindow>
          {(activeFile, setActiveFile) => {
            switch (activeFile) {
              case "suyash.ts":
                return <HeroFile onNavigate={setActiveFile} />;
              case "experience.json":
                return <ExperienceFile />;
              case "projects.json":
                return <ProjectsFile />;
              case "skills.py":
                return <SkillsFile />;
              case "achievements.md":
                return <AchievementsFile />;
              case "contact.go":
                return <ContactFile />;
              case "resume.pdf":
                return <ResumeFile />;
              default:
                return <HeroFile onNavigate={setActiveFile} />;
            }
          }}
        </IDEWindow>
      </main>
    </div>
  );
}
