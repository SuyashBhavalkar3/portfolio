"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Mail, Github, Linkedin, Terminal, ArrowRight, User } from "lucide-react";

interface HeroFileProps {
  onNavigate: (fileName: string) => void;
}

export default function HeroFile({ onNavigate }: HeroFileProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5 w-full max-w-4xl mx-auto py-1">
      {/* Code Block Mockup header */}
      <div className="font-mono text-[11px] md:text-xs text-zinc-500 border-b border-ide-border/50 pb-2.5">
        <span className="text-code-keyword">import</span> {"{ Developer, AI_Engineer }"} <span className="text-code-keyword">from</span> <span className="text-code-string">"suyash-bhavalkar"</span>;
        <br />
        <span className="text-code-keyword">const</span> <span className="text-code-variable">me</span> = <span className="text-code-keyword">new</span> <span className="text-code-function">Developer</span>({`{`}
        <br />
        &nbsp;&nbsp;name: <span className="text-code-string">"Suyash Bhavalkar"</span>,
        <br />
        &nbsp;&nbsp;role: <span className="text-code-string">"AI & ML / Backend Engineer"</span>,
        <br />
        &nbsp;&nbsp;location: <span className="text-code-string">"Pune, India"</span>
        <br />
        {`});`}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-1.5"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] md:text-xs font-mono w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Available for Spring/Summer Internships 2027</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-1">
              Suyash Bhavalkar
            </h1>
            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Building high-performance backend and AI systems
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-2xl"
          >
            Computer Science student specializing in distributed, fault-tolerant architectures, scalable system design, and AI model orchestration. Engineered production-grade systems serving 1,000+ users with <span className="text-white font-medium">&lt;450ms latency</span> using <span className="text-blue-400 font-mono">FastAPI</span> and <span className="text-emerald-400 font-mono">PostgreSQL</span>.
          </motion.p>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-ide-sidebar/60 border border-ide-border/50 font-mono text-center"
          >
            <div>
              <div className="text-lg md:text-xl font-bold text-white">250+</div>
              <div className="text-[10px] text-zinc-500">LeetCode Solved</div>
            </div>
            <div className="border-x border-ide-border/50">
              <div className="text-lg md:text-xl font-bold text-white">1500+</div>
              <div className="text-[10px] text-zinc-500">Contest Rating</div>
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold text-white">2</div>
              <div className="text-[10px] text-zinc-500">IEEE Publications</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-1"
          >
            <button
              onClick={() => onNavigate("projects.json")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate("contact.go")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-ide-border hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side Card: Personal Info/Resume card */}
        <div className="lg:col-span-4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-full max-w-[260px] p-4.5 rounded-xl bg-ide-sidebar/80 border border-ide-border relative overflow-hidden flex flex-col items-center text-center shadow-xl group hover:border-blue-500/40 transition-all"
          >
            {/* Glowing spot behind photo */}
            <div className="absolute top-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />

            {/* Profile Graphic/Placeholder */}
            <div className="w-18 h-18 rounded-full border-2 border-ide-border bg-ide-bg flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-all">
              <User className="w-9 h-9 text-zinc-600" />
            </div>

            <h3 className="text-base font-bold text-white mt-3">Suyash Bhavalkar</h3>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">B.Tech CS Engineering (AI & ML)</p>
            <p className="text-[10px] text-blue-400 font-mono mt-0.5">VIT, Pune</p>

            <div className="w-full border-t border-ide-border/50 my-3.5" />

            {/* Resume actions */}
            <div className="flex flex-col gap-2.5 w-full font-mono text-[10px] md:text-xs">
              <a
                href="/resume-v2.1.pdf"
                download="Suyash_Bhavalkar_Resume.pdf"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-300 border border-ide-border transition-all w-full cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </a>

              <a
                href="https://drive.google.com/file/d/11UDXmpEMlx-WAAe2Uk4qLK-BAzTYCiNI/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-ide-border/40 transition-all w-full cursor-pointer"
              >
                <span>View Drive PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Code style footer note */}
      <div className="font-mono text-[10px] md:text-xs text-zinc-600 border-t border-ide-border/50 pt-2.5 mt-2">
        {`// Run 'npm run dev' to launch local developer preview`}
        <br />
        {`// Contact Suyash at suyashbhavalkar82@gmail.com`}
      </div>
    </div>
  );
}
