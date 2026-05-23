"use client";

import React, { useState } from "react";
import { Folder, ExternalLink, Github, Filter, Code, Layout, HelpCircle, Lightbulb, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: "AI/ML" | "Backend" | "Full Stack";
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  github: string;
  live: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "hiremintora",
    title: "HireMintora",
    category: "Full Stack",
    description: "AI Recruiting Platform for real-time automated coding assessment and conversational interviewing.",
    problem: "The conventional approach to screening candidates lacks automated coding analysis, leading to severe HR inefficiencies.",
    solution: "Built a real-time conversational AI system using WebSockets, Groq (Llama 70B), TTS/STT services, Monaco Editor interface, and Redis context caching.",
    impact: "Implemented with robust fault tolerance handling 50+ concurrent WebSocket connections and automated performance reporting for 100+ users.",
    tech: ["WebSockets", "FastAPI", "Groq (Llama 70B)", "Redis", "Monaco Editor", "React.js"],
    github: "https://github.com/SuyashBhavalkar3/HireMintora",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "realtime-chat",
    title: "Real-Time Distributed Chat",
    category: "Backend",
    description: "Production-grade distributed chat application (WhatsApp-like) engineered on microservices architecture.",
    problem: "Building a messaging app for 1M+ users with low latency (<200ms) requires distributed message brokers, load balancing, and fault tolerance.",
    solution: "Created a Java microservices ecosystem using WebSockets for real-time channels, Apache Kafka for event-driven message dispatching, and Redis for active session caching, orchestrated with load balancing.",
    impact: "Sustains high availability and horizontal scalability serving up to 1M+ users with message delivery speeds under 200ms.",
    tech: ["Java", "Apache Kafka", "WebSockets", "Redis", "Microservices", "System Design"],
    github: "https://github.com/SuyashBhavalkar3/Real-Time-Distributed-Chat-System-Web-App",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "befit-tracker",
    title: "BeFit Calorie Tracker",
    category: "Full Stack",
    description: "AI-powered fitness system using prompt-driven multi-agent workflows for natural language logging.",
    problem: "Manual logging of nutritional intake and gym exercises is tedious and discourages consistent tracking.",
    solution: "Designed a LangGraph + Groq LLM pipeline that parses natural language logs, calculates calories/macros, and syncs data to a Next.js/FastAPI backend with Google OAuth.",
    impact: "Created a seamless conversational logging interface with user session authentication and automated calorie/macro aggregation.",
    tech: ["TypeScript", "LangGraph", "Groq", "FastAPI", "Next.js", "Google OAuth"],
    github: "https://github.com/SuyashBhavalkar3/A-Full-Stack-Intelligent-Calorie-Tracking-System-Using-Prompt-Driven-Multi-Agent-Workflows",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "autodeck-ai",
    title: "AutoDeck AI",
    category: "AI/ML",
    description: "Autonomous Presentation Generation Agent delivering fully structured slide decks in seconds.",
    problem: "Manual creation of structured presentation decks takes 30-60 minutes per deck and lacks intelligent, instant content generation.",
    solution: "Designed a multi-agent pipeline (planner-executor) using FastAPI, JWT, Google OAuth, and GPT-3.5 Turbo to parse requests and generate complete layouts with dynamic image embedding.",
    impact: "Reduced presentation manual drafting effort by 80%, enabling 5-10 slide decks to be generated in under 10 seconds with secure media integration.",
    tech: ["FastAPI", "GPT-3.5 Turbo", "Multi-Agent System", "Google OAuth", "JWT", "Vercel"],
    github: "https://github.com/SuyashBhavalkar3/Autonomous_Generative_AI_Agent_for_Presentation_Creation",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "gym-posture-correction",
    title: "Gym Posture Correction",
    category: "AI/ML",
    description: "Real-time exercise form correction and pose detection system using computer vision.",
    problem: "Improper exercise postures lead to gym injuries, and personal trainers are not always accessible.",
    solution: "Engineered a computer vision posture analyzer utilizing MediaPipe for pose landmarks, communicating over WebSockets to a React + TypeScript client and FastAPI backend.",
    impact: "Provides instant, real-time visual feedback and form corrections for 6+ standard gym exercises.",
    tech: ["FastAPI", "React.js", "MediaPipe", "WebSockets", "TypeScript", "Computer Vision"],
    github: "https://github.com/SuyashBhavalkar3/An-Automated-System-for-Gym-Exercise-Posture-Correction-Using-Computer-Vision",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "satellite-cybersecurity",
    title: "Satellite Intrusion Detection",
    category: "AI/ML",
    description: "Telemetry anomaly detection and explainable cybersecurity scoring system for satellite communications.",
    problem: "Securing satellite communication systems against sophisticated cyber attacks requires real-time telemetry anomaly monitoring.",
    solution: "Built a machine learning pipeline that ingests satellite telemetry, detects network anomalies, generates threat scores, and provides explainable AI insights.",
    impact: "Provides robust, explainable security alerts for telemetry streams to prevent satellite communications hijack.",
    tech: ["Python", "Machine Learning", "Jupyter Notebook", "Explainable AI", "Security Analytics"],
    github: "https://github.com/SuyashBhavalkar3/Artificial-Intelligence-Based-Intrusion-Detection-for-Satellite-Communication-Systems",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "shoption-extraction",
    title: "Shoption Lead Extraction",
    category: "Full Stack",
    description: "AI-powered platform that automates business lead discovery and contact data extraction.",
    problem: "Manually mining search results to enrich lead contact lists is highly repetitive and error-prone.",
    solution: "Developed an automated scraping and contact-matching pipeline using FastAPI, NextJS, Regex data parsing, and Railway hosting.",
    impact: "Drastically reduces lead generation cycles, automating contact enrichment and prospect list assembly.",
    tech: ["TypeScript", "Next.js", "FastAPI", "Regex", "Railway", "Automation"],
    github: "https://github.com/SuyashBhavalkar3/Shoption-Lead-Extraction",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "quantum-arena",
    title: "Quantum Arena 1.0",
    category: "Full Stack",
    description: "AI recruitment screening platform with automated video/audio interviewer feedback.",
    problem: "HR teams struggle to grade conversational interviews and coding tests in hackathon-style recruitment.",
    solution: "Built a full-stack platform using Next.js, TypeScript, and LLM integrations that analyzes candidate resume details and provides feedback.",
    impact: "Successfully deployed for hackathon assessment, generating grading logs for candidates.",
    tech: ["TypeScript", "Next.js", "React.js", "LLM Integration", "Recruitment Tech"],
    github: "https://github.com/SuyashBhavalkar3/quantum_arena",
    live: "https://github.com/SuyashBhavalkar3"
  },
  {
    id: "advocategpt",
    title: "AdvocateGPT",
    category: "Backend",
    description: "Retrieval-Augmented Generation (RAG) legal assistant for complex precedent search.",
    problem: "Legal experts spend hours manually analyzing complex penal codes (IPC) to find relevant historical precedents and cases.",
    solution: "Built a complete RAG pipeline embedding Indian Penal Code (IPC) texts using Hugging Face text-embedding models into a FAISS vector database, using MS MARCO CrossEncoder reranking for context optimization.",
    impact: "Significantly accelerated case retrieval, verifying effectiveness and retrieval quality using Precision@k, Recall@k, and MRR metrics.",
    tech: ["Python", "RAG Pipeline", "Hugging Face", "FAISS", "CrossEncoder", "FastAPI"],
    github: "https://github.com/SuyashBhavalkar3/RAG_based_Legal_and_Policy_Document_Assistant",
    live: "https://github.com/SuyashBhavalkar3"
  }
];

export default function ProjectsFile() {
  const [viewMode, setViewMode] = useState<"visual" | "json">("visual");
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === "All" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  const rawJson = JSON.stringify(PROJECTS_DATA, null, 2);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto py-2">
      {/* File type toggle and filter */}
      <div className="flex flex-wrap items-center justify-between border-b border-ide-border/50 pb-3 gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-zinc-500" />
          <div className="flex gap-1.5">
            {["All", "AI/ML", "Backend", "Full Stack"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (viewMode === "json") setViewMode("visual");
                  setFilter(cat);
                }}
                className={`px-2.5 py-0.5 rounded cursor-pointer transition-all ${
                  filter === cat && viewMode === "visual"
                    ? "bg-blue-900/30 text-blue-400 border border-blue-500/30" 
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
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
            <span>Grid Cards</span>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex flex-col rounded-lg bg-ide-sidebar/50 border border-ide-border overflow-hidden hover:border-blue-500/40 hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => setSelectedProject(p)}
            >
              {/* Card top decorative pane */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-ide-border/50 bg-[#0d0e12] font-mono text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Folder className="w-3.5 h-3.5 text-blue-400" />
                  {p.id}.json
                </span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{p.category}</span>
              </div>

              <div className="p-5 flex-1 flex flex-col gap-3">
                <h3 className="text-base font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed flex-1">
                  {p.description}
                </p>

                {/* Tech tag list */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tech.slice(0, 3).map((t) => (
                    <span 
                      key={t} 
                      className="px-2 py-0.5 rounded bg-zinc-800/80 text-[10px] text-zinc-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="text-[10px] text-zinc-600 font-mono pl-1">+{p.tech.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Card bottom actions */}
              <div className="px-5 py-3 bg-[#0d0e12]/40 border-t border-ide-border/50 flex justify-between items-center text-xs font-mono">
                <span className="text-blue-400 group-hover:underline flex items-center gap-1">
                  Read blueprint &rarr;
                </span>
                <div className="flex gap-3 text-zinc-500" onClick={(e) => e.stopPropagation()}>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Repos on GitHub CTA */}
        <div className="flex justify-center mt-6">
          <a
            href="https://github.com/SuyashBhavalkar3?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-zinc-850/80 hover:bg-zinc-800 hover:text-white text-zinc-300 border border-ide-border transition-all hover:translate-y-[-1.5px] font-mono text-xs cursor-pointer"
          >
            <Github className="w-4 h-4 text-blue-400" />
            <span>View All Repositories on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        </>
      ) : (
        <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs overflow-x-auto text-zinc-400 leading-relaxed">
          <pre className="text-zinc-300">
            {rawJson.split("\n").map((line, lIdx) => {
              let highlighted = line;
              if (line.includes('"title"') || line.includes('"category"') || line.includes('"description"') || line.includes('"problem"') || line.includes('"solution"') || line.includes('"impact"') || line.includes('"tech"') || line.includes('"github"') || line.includes('"live"')) {
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

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-ide-sidebar border border-ide-border rounded-xl shadow-2xl overflow-hidden text-sm"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-ide-border bg-[#0d0e12]">
                <h3 className="text-lg font-medium text-zinc-300 flex items-center gap-2">
                  <Folder className="w-5 h-5 text-blue-400" />
                  <span>{selectedProject.title}</span>
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[75vh]">
                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span 
                      key={t} 
                      className="px-2.5 py-1 rounded bg-[#1e2330] border border-ide-border text-zinc-300 font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Problem, Solution, Impact structured blocks */}
                <div className="flex flex-col gap-4">
                  <div className="p-4 rounded-lg bg-red-950/15 border border-red-500/10 flex gap-3">
                    <HelpCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-200">The Problem</h4>
                      <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{selectedProject.problem}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-950/15 border border-blue-500/10 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-200">The Solution</h4>
                      <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-950/15 border border-emerald-500/10 flex gap-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-emerald-200">The Impact</h4>
                      <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">{selectedProject.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 border-t border-ide-border/50 pt-4 font-mono text-xs">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white border border-ide-border transition-colors cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repository</span>
                  </a>
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
