"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, ChevronDown, Code, Layout } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  skills: string[];
  points: string[];
}

const EXPERIENCE_DATA: Experience[] = [
  {
    company: "CodeSpyder Technologies Pvt Ltd.",
    location: "Pune, India",
    role: "GenAI Intern",
    period: "Feb 2026 – Present",
    skills: ["FastAPI", "Next.js", "PostgreSQL", "SQLAlchemy", "Supabase", "Llama 70B", "Rate Limiting"],
    points: [
      "Managing a team of 6 interns developing a Learning Management System (LMS) scaling to support 1,000+ users and 100+ concurrent sessions.",
      "Developed a robust FastAPI & Next.js backend using PostgreSQL (SQLAlchemy) via Supabase.",
      "Engineered an API Gateway & Rate Limiting services achieving ~200ms CRUD latency.",
      "Implemented Llama 70B model for AI-enabled mock interviews, tuning error management to reduce AI response latency to 800–1000ms."
    ]
  },
  {
    company: "CanSpirit Artificial Intelligence",
    location: "Pune, India",
    role: "Software Engineering Intern - AI",
    period: "Aug 2025 – Feb 2026",
    skills: ["Machine Learning", "Extra Trees Algorithm", "Video Processing", "Pipeline Logging", "API latency Optimization"],
    points: [
      "Developed an Emotion Analytics Detection system for disabled students, analyzing 1,000 videos at 5 FPS.",
      "Implemented an Extra Trees classifier achieving 88% accuracy, surpassing deep learning baselines, KNN (78%), and Random Forest (83%).",
      "Ensured a steady 800–1000ms API latency with pipeline logging and monitoring."
    ]
  }
];

export default function ExperienceFile() {
  const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const rawJson = JSON.stringify(EXPERIENCE_DATA, null, 2);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto py-2">
      {/* File type toggle (Visual representation vs JSON view) */}
      <div className="flex items-center justify-between border-b border-ide-border/50 pb-3 font-mono text-xs">
        <div className="text-zinc-500">
          <span>// Toggle view format for experience.json</span>
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
            <span>Interactive UI</span>
          </button>
          <button
            onClick={() => setViewMode("json")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded cursor-pointer transition-all ${
              viewMode === "json" 
                ? "bg-blue-600 text-white font-medium shadow-md" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw JSON</span>
          </button>
        </div>
      </div>

      {viewMode === "visual" ? (
        <div className="flex flex-col gap-8 relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-ide-border">
          {EXPERIENCE_DATA.map((job, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={job.company}
                className="relative group"
              >
                {/* Timeline node */}
                <div className={`absolute left-[-25px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                  isExpanded 
                    ? "bg-blue-500 border-blue-400 ring-4 ring-blue-500/10 scale-110" 
                    : "bg-ide-sidebar border-ide-border group-hover:border-blue-500"
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Job Card */}
                <div className="p-5 rounded-lg bg-ide-sidebar/50 border border-ide-border hover:border-ide-border-active/40 transition-all shadow-md">
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between gap-2 cursor-pointer"
                    onClick={() => toggleExpand(idx)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <h3 className="text-base font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">
                          {job.role}
                        </h3>
                      </div>
                      <p className="text-zinc-300 font-medium mt-1 ml-6">{job.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 ml-6 md:ml-0 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      {isExpanded ? <ChevronDown className="w-4 h-4 text-zinc-400 hidden md:block" /> : <ChevronRight className="w-4 h-4 text-zinc-400 hidden md:block" />}
                    </div>
                  </div>

                  {/* Expandable Points details */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-ide-border/50 flex flex-col gap-3 pl-6 overflow-hidden"
                    >
                      <ul className="list-disc list-outside text-sm text-zinc-400 flex flex-col gap-2.5">
                        {job.points.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed pl-1">
                            {pt}
                          </li>
                        ))}
                      </ul>

                      {/* Skills tagged */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-2.5 py-1 rounded bg-[#1e2330]/60 border border-ide-border text-zinc-300 text-xs font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs overflow-x-auto text-zinc-400 leading-relaxed">
          <pre className="text-zinc-300">
            {rawJson.split("\n").map((line, lIdx) => {
              // Simple JSON syntax highlighting replacement for readability
              let highlighted = line;
              if (line.includes('"company"') || line.includes('"location"') || line.includes('"role"') || line.includes('"period"') || line.includes('"skills"') || line.includes('"points"')) {
                highlighted = line.replace(/"(\w+)":/, '<span class="text-code-keyword">"$1"</span>:');
              } else if (line.includes(': "')) {
                highlighted = line.replace(/: "([^"]+)"/, ': <span class="text-code-string">"$1"</span>');
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
