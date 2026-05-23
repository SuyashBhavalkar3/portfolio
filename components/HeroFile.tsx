"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Mail, Github, Linkedin, Terminal, ArrowRight, User, FileText } from "lucide-react";
import Script from "next/script";

interface HeroFileProps {
  onNavigate: (fileName: string) => void;
}

export default function HeroFile({ onNavigate }: HeroFileProps) {
  useEffect(() => {
    // Re-render LinkedIn badge if script is already loaded (handles tab switching)
    if (typeof window !== "undefined" && (window as any).LIRenderAll) {
      try {
        (window as any).LIRenderAll();
      } catch (err) {
        console.error("LinkedIn badge render error:", err);
      }
    }
  }, []);

  return (
    <div className="flex flex-col justify-between w-full max-w-[1200px] mx-auto flex-1 py-1">
      <Script 
        src="https://platform.linkedin.com/badges/js/profile.js" 
        async 
        defer 
        type="text/javascript"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as any).LIRenderAll) {
            (window as any).LIRenderAll();
          }
        }}
      />
      {/* Code Block Mockup header */}
      <div className="font-mono text-[11px] md:text-xs text-zinc-555 border-b border-ide-border/50 pb-2 shrink-0">
        <span className="text-code-keyword">import</span> {"{ Developer }"} <span className="text-code-keyword">from</span> <span className="text-code-string">"suyash"</span>;
        <br />
        <span className="text-code-keyword">const</span> <span className="text-code-variable">me</span> = <span className="text-code-keyword">new</span> <span className="text-code-function">Developer</span>(<span className="text-code-string">"Suyash"</span>, <span className="text-code-string">"AI/ML & Backend"</span>, <span className="text-code-string">"Pune, IN"</span>);
      </div>

      {/* Main Content (centered vertically) */}
      <div className="flex-1 flex flex-col justify-center my-2 md:my-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center w-full">
          {/* Left Side Info */}
          <div className="lg:col-span-7 flex flex-col gap-4 md:gap-5">
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
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-300 mt-1">
                Suyash Bhavalkar
              </h1>
              <p className="text-lg md:text-xl font-semibold text-blue-400">
                Building high-performance backend and AI systems
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-2xl"
            >
              Computer Science student specializing in distributed, fault-tolerant architectures, scalable system design, and AI model orchestration. Engineered production-grade systems serving 1,000+ users with <span className="text-zinc-300 font-normal">&lt;450ms latency</span> using <span className="text-blue-400 font-mono">FastAPI</span> and <span className="text-emerald-400 font-mono">PostgreSQL</span>.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-ide-sidebar/60 border border-ide-border/50 font-mono text-center"
            >
              <div>
                <div className="text-lg md:text-xl font-medium text-zinc-300">250+</div>
                <div className="text-[10px] text-zinc-500">LeetCode Solved</div>
              </div>
              <div className="border-x border-ide-border/50">
                <div className="text-lg md:text-xl font-medium text-zinc-300">1500+</div>
                <div className="text-[10px] text-zinc-500">Contest Rating</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-medium text-zinc-300">2</div>
                <div className="text-[10px] text-zinc-500">IEEE Publications</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-0.5"
            >
              <button
                onClick={() => onNavigate("projects.json")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-zinc-200 text-xs font-normal shadow-lg hover:shadow-blue-500/10 hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate("contact.go")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-normal border border-ide-border hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <span>Get in Touch</span>
              </button>
            </motion.div>
          </div>

          {/* Right Side Card: Personal Info/Resume card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="w-full max-w-[300px] p-6 rounded-xl bg-ide-sidebar/80 border border-ide-border relative overflow-hidden flex flex-col items-center text-center shadow-xl group hover:border-blue-500/40 transition-all mt-0.5"
            >


              {/* LinkedIn Profile Badge */}
              <div className="w-full flex items-center justify-center relative">
                <div 
                  style={{ width: "250px" }}
                  className="badge-base LI-profile-badge" 
                  data-locale="en_US" 
                  data-size="medium" 
                  data-theme="dark" 
                  data-type="VERTICAL" 
                  data-vanity="suyashbhavalkar3" 
                  data-version="v1" 
                />
                {/* Transparent overlay to block clicks on the profile info/links while keeping the bottom 'View profile' button clickable */}
                <div 
                  className="absolute cursor-default bg-transparent"
                  style={{ 
                    width: "250px", 
                    top: "0px", 
                    bottom: "54px", 
                    zIndex: 10 
                  }}
                />
              </div>

              <div className="w-full border-t border-ide-border/50 my-3" />

              {/* Resume actions (side-by-side) */}
              <div className="flex gap-2 w-full font-mono text-[10px]">
                <a
                  href="/resume-v2.1.pdf"
                  download="Suyash_Bhavalkar_Resume.pdf"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-800 hover:bg-blue-600 hover:text-zinc-100 text-zinc-300 border border-ide-border transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>Resume</span>
                </a>

                <button
                  onClick={() => onNavigate("resume.pdf")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-zinc-900 hover:bg-[#1e2330] hover:text-zinc-100 text-zinc-400 hover:text-zinc-200 border border-ide-border/40 transition-all cursor-pointer font-mono"
                >
                  <span>Open in Tab</span>
                  <FileText className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
