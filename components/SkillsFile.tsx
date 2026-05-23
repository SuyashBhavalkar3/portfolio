"use client";

import React, { useState } from "react";
import { Terminal, Code, Layout, Cpu, Database, Server, Settings, Wrench } from "lucide-react";
import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  skills: string[];
}

export default function SkillsFile() {
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");

  const SKILL_CATEGORIES: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code className="w-5 h-5" />,
      iconColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
      skills: ["Python", "TypeScript", "JavaScript", "GoLang", "Java", "SQL", "Node.js", "Bash"]
    },
    {
      title: "Backend & APIs",
      icon: <Server className="w-5 h-5" />,
      iconColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
      skills: ["FastAPI", "REST APIs", "WebSockets", "Async Processing", "API Design", "Authentication (JWT)", "Middleware"]
    },
    {
      title: "AI/ML",
      icon: <Cpu className="w-5 h-5" />,
      iconColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      skills: ["LLM Orchestration", "RAG Pipeline", "Prompt Engineering", "NLP", "Vector Embeddings", "Model Evaluation"]
    },
    {
      title: "Frameworks & Databases",
      icon: <Database className="w-5 h-5" />,
      iconColor: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
      skills: ["LangChain", "TensorFlow", "Sklearn", "PostgreSQL", "Redis", "FAISS", "Supabase", "React.js", "Next.js", "Vue.js"]
    },
    {
      title: "Systems & Tools",
      icon: <Wrench className="w-5 h-5" />,
      iconColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      skills: ["Distributed Systems", "Microservices", "Rate Limiting", "Fault Tolerance", "Caching", "Docker", "Git", "Vercel", "Render"]
    }
  ];

  const pythonCode = `# scripts/skills.py
class SuyashSkills:
    def __init__(self):
        self.languages = [
            "Python", "TypeScript", "JavaScript", 
            "GoLang", "Java", "SQL", "Node.js", "Bash"
        ]
        
        self.backend_and_apis = {
            "frameworks": ["FastAPI"],
            "protocols": ["REST APIs", "WebSockets"],
            "features": ["Async Processing", "API Design", "JWT Auth", "Middleware"]
        }
        
        self.ai_ml = [
            "LLM Orchestration", "RAG Pipeline", "Prompt Engineering", 
            "NLP", "Vector Embeddings", "Model Evaluation"
        ]
        
        self.frameworks_and_databases = {
            "ai_tools": ["LangChain", "TensorFlow", "Sklearn"],
            "databases": ["PostgreSQL", "Redis", "FAISS", "Supabase"],
            "frontend": ["React.js", "Next.js", "Vue.js"]
        }
        
        self.systems_and_tools = [
            "Distributed Systems", "Microservices", "Rate Limiting", 
            "Fault Tolerance", "Caching", "Docker", "Git", "Vercel", "Render"
        ]
        
    def get_summary(self):
        return f"Proficient in {len(self.languages)} languages, with specialization in GenAI & scalable backends."
`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-2">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between border-b border-ide-border/50 pb-3 font-mono text-xs">
        <div className="text-zinc-500">
          <span># skills.py - technical expertise</span>
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
            <span>Categorized UI</span>
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded cursor-pointer transition-all ${
              viewMode === "code" 
                ? "bg-blue-600 text-white font-medium shadow-md" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Python Script</span>
          </button>
        </div>
      </div>

      {viewMode === "visual" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-5 rounded-lg bg-ide-sidebar/50 border border-ide-border hover:border-blue-500/20 transition-all flex flex-col gap-4 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border flex items-center justify-center transition-colors group-hover:scale-105 duration-300 ${cat.iconColor}`}>
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded bg-zinc-800/60 hover:bg-[#1e2330] hover:text-white border border-ide-border text-zinc-300 text-xs font-mono transition-all duration-200 hover:scale-[1.03] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs overflow-x-auto text-zinc-400 leading-relaxed">
          <pre className="text-zinc-300">
            {pythonCode.split("\n").map((line, lIdx) => {
              let highlighted = line;
              // Very simple Python highlighting for presentation
              if (line.startsWith("class") || line.includes("def ") || line.includes("self") || line.includes("import")) {
                highlighted = line
                  .replace(/(class|def|import|from)/g, '<span class="text-code-keyword">$1</span>')
                  .replace(/(self)/g, '<span class="text-code-variable">$1</span>');
              } else if (line.includes('"')) {
                // color strings green
                highlighted = line.replace(/"([^"]+)"/g, '<span class="text-code-string">"$1"</span>');
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
