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

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 md:p-8 bg-[#090a0f] min-h-screen relative overflow-hidden">
      {/* Background glowing light leak spots for Antigravity theme */}
      <div className="glow-spot glow-blue w-[350px] h-[350px] md:w-[450px] md:h-[450px] top-[-100px] left-[-50px]" />
      <div className="glow-spot glow-purple w-[400px] h-[400px] md:w-[500px] md:h-[500px] bottom-[-100px] right-[-50px]" />
      <div className="glow-spot glow-cyan w-[250px] h-[250px] md:w-[350px] md:h-[350px] top-[40%] right-[5%]" />
      <div className="glow-spot glow-emerald w-[200px] h-[200px] md:w-[300px] md:h-[300px] bottom-[30%] left-[5%]" />

      {/* Floating abstract decorative elements (Antigravity float effect) */}
      <div className="absolute top-[8%] left-[85%] w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-[15%] left-[8%] w-2 h-2 bg-white/10 rounded-full animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-[65%] left-[4%] w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-[20%] left-[12%] w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />

      <main className="w-full max-w-5xl z-10 flex flex-col items-center">
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

