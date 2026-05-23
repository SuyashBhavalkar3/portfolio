"use client";

import React, { useState, useEffect } from "react";
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  GitBranch, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  User,
  Heart,
  Search,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileItem {
  name: string;
  lang: string;
  iconColor: string;
  path: string;
}

const FILES: FileItem[] = [
  { name: "suyash.ts", lang: "TypeScript", iconColor: "text-blue-400", path: "src/suyash.ts" },
  { name: "experience.json", lang: "JSON", iconColor: "text-yellow-400", path: "data/experience.json" },
  { name: "projects.json", lang: "JSON", iconColor: "text-yellow-400", path: "data/projects.json" },
  { name: "skills.py", lang: "Python", iconColor: "text-green-400", path: "scripts/skills.py" },
  { name: "publications.md", lang: "Markdown", iconColor: "text-emerald-400", path: "docs/publications.md" },
  { name: "contact.go", lang: "Go", iconColor: "text-cyan-400", path: "api/contact.go" }
];

interface IDEWindowProps {
  children: (activeFile: string, setActiveFile: (name: string) => void) => React.ReactNode;
}

export default function IDEWindow({ children }: IDEWindowProps) {
  const [activeFile, setActiveFile] = useState<string>("suyash.ts");
  const [openTabs, setOpenTabs] = useState<string[]>(["suyash.ts"]);
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-detect mobile viewport on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 768);
    }
  }, []);

  // Auto-set line position depending on section clicks (mock)
  useEffect(() => {
    const handleScroll = () => {
      const line = Math.floor(Math.random() * 20) + 1;
      const col = Math.floor(Math.random() * 80) + 1;
      setCursorPos({ line, col });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openFile = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
    setActiveFile(fileName);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTabs = openTabs.filter((t) => t !== fileName);
    setOpenTabs(updatedTabs);
    if (activeFile === fileName && updatedTabs.length > 0) {
      setActiveFile(updatedTabs[updatedTabs.length - 1]);
    }
  };

  const activeFileInfo = FILES.find((f) => f.name === activeFile) || FILES[0];

  return (
    <div className="relative flex flex-col w-full h-[85vh] min-h-[600px] max-h-[820px] glass-panel border border-ide-border rounded-xl shadow-2xl overflow-hidden text-sm">
      {/* Top Header / Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0c10] border-b border-ide-border select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
          <span className="ml-4 text-xs text-zinc-500 font-mono hidden md:inline">SuyashBhavalkar - Antigravity IDE</span>
        </div>

        {/* Breadcrumbs or central title */}
        <div className="text-xs text-zinc-400 font-mono">
          portfoliov2 &gt; {activeFileInfo.path}
        </div>

        {/* Social Quick Links */}
        <div className="flex items-center gap-3 text-zinc-400">
          <a href="https://github.com/SuyashBhavalkar3" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/suyash-bhavalkar-a58925251/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:suyashbhavalkar82@gmail.com" className="hover:text-white transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 flex-col md:flex-row relative min-h-0 overflow-hidden">
        {/* Sidebar Toggle for Mobile */}
        <div className="md:hidden flex items-center justify-between p-2 bg-ide-sidebar border-b border-ide-border">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white px-2 py-1 rounded bg-ide-bg border border-ide-border"
          >
            <Menu className="w-4 h-4" />
            <span>Explorer</span>
          </button>
          <span className="text-xs text-zinc-500 font-mono">{activeFile}</span>
        </div>

        {/* Left Explorer Sidebar */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div 
              initial={{ x: -240, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -240, opacity: 0 }}
              transition={{ type: "tween", duration: 0.15 }}
              className="absolute md:relative z-20 md:z-auto left-0 top-[37px] md:top-auto bottom-0 h-[calc(100%-37px)] md:h-auto bg-ide-sidebar border-r border-ide-border flex flex-col select-none shrink-0 w-[240px] shadow-2xl md:shadow-none"
            >
              {/* Explorer Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-ide-border/50 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span>Explorer</span>
                <span className="text-[10px] text-zinc-500">PORTFOLIO-V2</span>
              </div>

              {/* File Tree */}
              <div className="flex-1 py-3 overflow-y-auto">
                <div 
                  className="flex items-center gap-1 px-4 py-1 text-zinc-300 hover:text-white cursor-pointer hover:bg-ide-bg transition-colors"
                  onClick={() => setIsFolderOpen(!isFolderOpen)}
                >
                  {isFolderOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  {isFolderOpen ? <FolderOpen className="w-4 h-4 text-blue-400" /> : <Folder className="w-4 h-4 text-blue-400" />}
                  <span className="font-semibold text-xs ml-1">portfolio-source</span>
                </div>

                {isFolderOpen && (
                  <div className="pl-6 mt-1 flex flex-col gap-0.5">
                    {FILES.map((file) => {
                      const isActive = activeFile === file.name;
                      return (
                        <div
                          key={file.name}
                          onClick={() => openFile(file.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-l-md cursor-pointer transition-all border-l-2 ${
                            isActive 
                              ? "bg-ide-editor/80 text-blue-400 border-blue-500 font-medium" 
                              : "text-zinc-400 hover:bg-ide-editor/40 hover:text-zinc-200 border-transparent"
                          }`}
                        >
                          <FileCode className={`w-4 h-4 ${file.iconColor}`} />
                          <span className="font-mono text-xs">{file.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Static Settings/Info at bottom of Sidebar */}
              <div className="p-3 border-t border-ide-border/50 bg-[#0a0c10] text-xs text-zinc-500 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Suyash Bhavalkar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-red-500/80" />
                  <span>React / Next.js / FastAPI</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-ide-editor min-h-0">
          {/* Tabs Bar */}
          <div className="flex items-center bg-ide-tabs border-b border-ide-border overflow-x-auto scrollbar-none select-none">
            {openTabs.map((tabName) => {
              const file = FILES.find((f) => f.name === tabName) || FILES[0];
              const isActive = activeFile === tabName;
              return (
                <div
                  key={tabName}
                  onClick={() => setActiveFile(tabName)}
                  className={`flex items-center gap-2 px-4 py-2.5 border-r border-ide-border cursor-pointer transition-all shrink-0 font-mono text-xs ${
                    isActive 
                      ? "bg-ide-editor text-white border-t-2 border-t-blue-500" 
                      : "bg-[#0b0d13] text-zinc-500 hover:bg-ide-editor/40 hover:text-zinc-300"
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 ${file.iconColor}`} />
                  <span>{tabName}</span>
                  {openTabs.length > 1 && (
                    <X
                      className="w-3 h-3 text-zinc-500 hover:text-white rounded hover:bg-zinc-800 p-0.5"
                      onClick={(e) => closeTab(tabName, e)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Editor Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
            {children(activeFile, openFile)}
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-blue-600 text-white text-xs select-none select-none font-mono">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-blue-700 px-2 py-0.5 rounded text-[11px] font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>PORTFOLIO v2.0</span>
          </div>
          <a 
            href="https://github.com/SuyashBhavalkar3" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>main</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4 text-blue-100">
          <span className="hidden sm:inline">Ln {cursorPos.line}, Col {cursorPos.col}</span>
          <span className="hidden sm:inline">Spaces: 2</span>
          <span>UTF-8</span>
          <span className="bg-blue-700/80 px-2 py-0.5 rounded text-[11px]">{activeFileInfo.lang}</span>
        </div>
      </div>
    </div>
  );
}
