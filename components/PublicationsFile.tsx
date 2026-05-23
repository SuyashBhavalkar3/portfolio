"use client";

import React, { useState } from "react";
import { BookOpen, Trophy, Award, Users, Code, Layout, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface Publication {
  title: string;
  type: string;
  description: string;
  tags: string[];
}

interface Achievement {
  title: string;
  category: "Coding" | "Certification" | "Leadership";
  description: string;
  icon: React.ReactNode;
}

export default function PublicationsFile() {
  const [viewMode, setViewMode] = useState<"visual" | "markdown">("visual");

  const PUBLICATIONS: Publication[] = [
    {
      title: "Applications of Artificial Intelligence in Predictive Data-driven Systems",
      type: "IEEE Conference Publication",
      description: "Co-authored and contributed to research regarding the integration of predictive analytics and machine learning pipelines for complex real-world data patterns.",
      tags: ["AI/ML", "IEEE", "Research Paper", "Data-driven Systems"]
    },
    {
      title: "Scalable Data Structures and AI Implementations in High-Throughput Scenarios",
      type: "IEEE Conference Publication",
      description: "Contributed to research discussing performance benchmarks, memory footprints, and optimization algorithms for high-throughput pipeline design.",
      tags: ["Data Structures", "Performance Optimization", "IEEE", "Research"]
    }
  ];

  const ACHIEVEMENTS: Achievement[] = [
    {
      title: "LeetCode Contest Rating: 1500+",
      category: "Coding",
      description: "Solved 250+ algorithmic problems, demonstrating strong fundamentals in data structures, algorithms, and logical problem-solving.",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />
    },
    {
      title: "Java Fundamentals and DSA Foundation",
      category: "Certification",
      description: "Completed professional DSA and programming foundation training from Scaler Academy.",
      icon: <Award className="w-5 h-5 text-blue-500" />
    },
    {
      title: "Data Science & GenAI Certification",
      category: "Certification",
      description: "Specialized training on generative models, predictive modeling, and system architectures at CodeSpyder.",
      icon: <GraduationCap className="w-5 h-5 text-emerald-500" />
    },
    {
      title: "Vishwaconclave Stage & Audio Manager",
      category: "Leadership",
      description: "Managed a team of 10+ members, coordinating large-scale setup for audio, staging, and lighting for high-profile events.",
      icon: <Users className="w-5 h-5 text-purple-500" />
    },
    {
      title: "SWDC Matadhikar Campaign Lead",
      category: "Leadership",
      description: "Led a delegation of 25 coordinators, driving outreach and achieving 3,000+ registrations for civic awareness programs.",
      icon: <Users className="w-5 h-5 text-pink-500" />
    }
  ];

  const markdownContent = `# docs/publications.md

## 📚 IEEE Research Publications
* Contributed to **2 IEEE publications** in international conferences focusing on AI/ML applications and data-driven systems.

---

## 🏆 Problem Solving & Competitive Coding
* **LeetCode Profile**: Solved **250+ problems**.
* **Contest Rating**: **1500+** with strong foundation in DSA.

---

## 🎓 Professional Certifications
* **Java & DSA Foundation**: Scaler Academy.
* **Data Science & GenAI**: CodeSpyder Technologies.

---

## 👥 Leadership & Event Management
* **Vishwaconclave Manager**: Coordinated event stage/audio setup; managed 10+ members.
* **SWDC Matadhikar Lead**: Led 25 coordinators; successfully gathered 3,000+ registrations.
`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2">
      {/* File type toggle */}
      <div className="flex items-center justify-between border-b border-ide-border/50 pb-3 font-mono text-xs">
        <div className="text-zinc-500">
          <span># publications.md - research & accomplishments</span>
        </div>
        <div className="flex gap-2 bg-ide-sidebar p-1 rounded border border-ide-border">
          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded cursor-pointer transition-all ${
              viewMode === "visual" 
                ? "bg-blue-600 text-white font-medium shadow-md" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Document UI</span>
          </button>
          <button
            onClick={() => setViewMode("markdown")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded cursor-pointer transition-all ${
              viewMode === "markdown" 
                ? "bg-blue-600 text-white font-medium shadow-md" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>
        </div>
      </div>

      {viewMode === "visual" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Publications column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white font-semibold border-b border-ide-border pb-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h2>IEEE Research Publications</h2>
            </div>

            <div className="flex flex-col gap-5">
              {PUBLICATIONS.map((pub, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  key={pub.title}
                  className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border flex flex-col gap-2.5 hover:border-blue-500/20 transition-all"
                >
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">{pub.type}</span>
                  <h3 className="text-sm font-bold text-white leading-snug">{pub.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pub.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pub.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-[9px] text-zinc-400 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-white font-semibold border-b border-ide-border pb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h2>Honors & Certifications</h2>
            </div>

            <div className="flex flex-col gap-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={ach.title}
                  className="p-3.5 rounded-lg bg-ide-sidebar/40 border border-ide-border flex gap-3.5 items-start hover:border-blue-500/20 transition-all"
                >
                  <div className="p-2 rounded bg-zinc-850 border border-ide-border flex items-center justify-center shrink-0 mt-0.5">
                    {ach.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-white leading-tight">{ach.title}</h3>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">{ach.category}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{ach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs overflow-x-auto text-zinc-400 leading-relaxed">
          <pre className="text-zinc-300">
            {markdownContent.split("\n").map((line, lIdx) => {
              let highlighted = line;
              // Very basic Markdown coloring for header/bold elements
              if (line.startsWith("#")) {
                highlighted = `<span class="text-code-keyword font-bold">${line}</span>`;
              } else if (line.includes("**")) {
                highlighted = line.replace(/\*\*([^*]+)\*\*/g, '<span class="text-white font-semibold">$1</span>');
              }
              return (
                <div key={lIdx} className="flex hover:bg-ide-sidebar/80 px-2 rounded">
                  <span className="w-8 text-zinc-600 text-right select-none pr-3 border-r border-ide-border mr-3">{lIdx + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </div>
  );
}
