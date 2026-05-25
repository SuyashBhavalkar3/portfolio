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
  X,
  Boxes
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
  { name: "achievements.md", lang: "Markdown", iconColor: "text-emerald-400", path: "docs/achievements.md" },
  { name: "contact.go", lang: "Go", iconColor: "text-cyan-400", path: "api/contact.go" },
  { name: "resume.pdf", lang: "PDF", iconColor: "text-red-400", path: "assets/resume.pdf" }
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
  const [isOpenEditorsOpen, setIsOpenEditorsOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);

  type WindowState = "normal" | "maximized" | "minimized" | "closed";
  const [windowState, setWindowState] = useState<WindowState>("normal");

  // Auto-detect mobile viewport on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSidebarOpen(window.innerWidth >= 768);
    }
  }, []);

  // Disable body scroll when maximized
  useEffect(() => {
    if (windowState === "maximized") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [windowState]);

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
    <AnimatePresence mode="wait">
      {windowState === "minimized" && (
        <motion.div
          key="minimized-dock"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setWindowState("normal")}
            className="flex items-center gap-3 px-4 py-2.5 bg-[#0e1017]/90 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl hover:border-blue-500/50 transition-colors group cursor-pointer"
          >
            {/* IDE Icon */}
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 22h20L12 2zM12 6l7.5 13h-15L12 6z" fill="rgba(59, 130, 246, 0.15)"/>
                <circle cx="12" cy="14" r="2.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-0.5">Active Session</span>
              <span className="text-xs font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors font-sans">Portfolio IDE</span>
            </div>
            {/* Mini green dot indicating active background app */}
            <div className="relative flex h-2 w-2 ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
          </motion.button>
        </motion.div>
      )}

      {windowState === "closed" && (
        <motion.div
          key="closed-terminal"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex items-center justify-center min-h-[400px] w-full"
        >
          <div className="flex flex-col items-center justify-center p-8 bg-[#0c0e15]/95 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full text-center backdrop-blur-xl z-20">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4">
              <X className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-200 mb-1 font-mono">Process Terminated</h3>
            <p className="text-xs text-zinc-400 mb-6 font-mono font-sans">Suyash-Portfolio IDE exited with status code 0.</p>
            
            <div className="flex flex-col gap-2 w-full">
              <button 
                onClick={() => setWindowState("normal")}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium text-xs font-mono transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                ./run_portfolio.sh
              </button>
              <button 
                onClick={() => {
                  try {
                    window.close();
                  } catch(e) {}
                }}
                className="w-full py-2 px-4 bg-[#161922] hover:bg-[#202534] border border-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
              >
                Close Browser Tab
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {(windowState === "normal" || windowState === "maximized") && (
        <motion.div
          key="ide-window"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className={
            windowState === "maximized"
              ? "fixed inset-0 z-50 flex flex-col w-screen h-screen bg-[#090a0f] border-none rounded-none shadow-none overflow-hidden text-sm"
              : "relative flex flex-col w-full h-[85vh] min-h-[600px] max-h-[820px] glass-panel border border-ide-border rounded-xl shadow-2xl overflow-hidden text-sm"
          }
        >
          {/* Top Header / Window Title Bar */}
          <div 
            onDoubleClick={() => setWindowState(windowState === "maximized" ? "normal" : "maximized")}
            className="flex items-center justify-between px-4 py-3 bg-[#0a0c10] border-b border-ide-border select-none cursor-default"
          >
            {/* Window controls & Menu Bar */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 mr-2 group/controls">
                {/* Close Button (Red) */}
                <button 
                  onClick={() => {
                    setWindowState("closed");
                    try {
                      window.close();
                    } catch (e) {}
                  }}
                  className="relative flex items-center justify-center w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/90 transition-all cursor-pointer text-[7px] text-red-950 font-bold select-none border-none outline-none"
                >
                  <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">✕</span>
                </button>
                
                {/* Minimize Button (Yellow) */}
                <button 
                  onClick={() => setWindowState("minimized")}
                  className="relative flex items-center justify-center w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/90 transition-all cursor-pointer text-[7px] text-yellow-950 font-bold select-none border-none outline-none"
                >
                  <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">─</span>
                </button>
                
                {/* Maximize Button (Green) */}
                <button 
                  onClick={() => setWindowState(windowState === "maximized" ? "normal" : "maximized")}
                  className="relative flex items-center justify-center w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/90 transition-all cursor-pointer text-[6px] text-green-950 font-bold select-none border-none outline-none"
                >
                  <span className="opacity-0 group-hover/controls:opacity-100 transition-opacity">⤢</span>
                </button>
              </div>
              
              {/* Antigravity Logo and Menu Items */}
              <div className="hidden lg:flex items-center gap-2 ml-1">
                <div className="w-4 h-4 flex items-center justify-center mr-1">
                  <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M12 2L2 22h20L12 2zM12 6l7.5 13h-15L12 6z" fill="rgba(59, 130, 246, 0.2)" />
                  </svg>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-sans">
                  {["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"].map((item) => (
                    <span key={item} className="hover:text-white cursor-pointer px-1.5 py-0.5 rounded hover:bg-[#1a1e2a]/50 transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Central File Breadcrumb */}
            <div className="text-xs text-zinc-400 font-mono hidden sm:block">
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
                <span className="font-sans">Explorer</span>
              </button>
              <span className="text-xs text-zinc-500 font-mono">{activeFile}</span>
            </div>

            {/* Left-most Activity Bar (VS Code style) */}
            <div className="hidden md:flex flex-col justify-between items-center w-[52px] bg-[#0c0d12]/90 border-r border-ide-border select-none py-3 text-zinc-500 shrink-0">
              {/* Top Icons */}
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Custom Brand Logo */}
                <div className="w-8 h-8 flex items-center justify-center mb-2 hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 22h20L12 2zM12 6l7.5 13h-15L12 6z" fill="rgba(59, 130, 246, 0.15)"/>
                    <circle cx="12" cy="14" r="2.5" fill="currentColor"/>
                  </svg>
                </div>

                {/* Explorer Toggle */}
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative group/tooltip cursor-pointer border-none outline-none ${
                    isSidebarOpen ? "text-blue-500 bg-ide-editor/40" : "hover:text-zinc-300"
                  }`}
                >
                  <FolderOpen className="w-5.5 h-5.5" />
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Explorer
                  </div>
                </button>

                {/* Search */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <Search className="w-5.5 h-5.5" />
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Search
                  </div>
                </div>

                {/* Git Branch Badge */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <GitBranch className="w-5.5 h-5.5" />
                  <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-blue-600 text-[9px] font-bold text-white leading-none scale-90">
                    5
                  </span>
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Source Control
                  </div>
                </div>

                {/* Run & Debug */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Run and Debug
                  </div>
                </div>

                {/* Extensions */}
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <Boxes className="w-5.5 h-5.5" />
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Extensions
                  </div>
                </div>
              </div>

              {/* Bottom Icons */}
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <User className="w-5.5 h-5.5" />
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Profile
                  </div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-lg hover:text-zinc-300 transition-colors relative group/tooltip cursor-pointer">
                  <Settings className="w-5.5 h-5.5" />
                  <div className="absolute left-14 px-2 py-1 rounded bg-[#131620] border border-ide-border text-zinc-300 text-[10px] font-mono whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-30 shadow-lg">
                    Settings
                  </div>
                </div>
              </div>
            </div>

            {/* Explorer Sidebar */}
            <AnimatePresence initial={false}>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ x: -240, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -240, opacity: 0 }}
                  transition={{ type: "tween", duration: 0.15 }}
                  className="absolute md:relative z-20 md:z-auto left-[52px] md:left-auto top-[37px] md:top-auto bottom-0 h-[calc(100%-37px)] md:h-auto bg-[#0e1017] md:bg-ide-sidebar border-r border-ide-border flex flex-col select-none shrink-0 w-[240px] shadow-2xl md:shadow-none"
                >
                  {/* Explorer Header */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-ide-border/50 text-xs font-semibold text-zinc-400 font-sans">
                    <span className="uppercase tracking-wider">Explorer</span>
                    <button className="text-zinc-500 hover:text-white transition-colors cursor-pointer text-xs border-none bg-transparent">
                      •••
                    </button>
                  </div>

                  {/* Collapsible Accordion Sections */}
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Accordion 1: Open Editors */}
                    <div className="flex flex-col border-b border-ide-border/30 shrink-0">
                      <div 
                        onClick={() => setIsOpenEditorsOpen(!isOpenEditorsOpen)}
                        className="flex items-center gap-1 px-3 py-1.5 text-zinc-450 hover:text-zinc-200 cursor-pointer bg-ide-sidebar/20 uppercase tracking-wider text-[10px] font-bold select-none font-sans"
                      >
                        {isOpenEditorsOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                        <span>Open Editors</span>
                      </div>
                      
                      {isOpenEditorsOpen && (
                        <div className="flex flex-col gap-0.5 py-1.5 pl-3 pr-2">
                          {openTabs.map((tabName) => {
                            const file = FILES.find((f) => f.name === tabName) || FILES[0];
                            const isActive = activeFile === tabName;
                            
                            // Extract parent directory
                            let folder = "src";
                            
                            if (tabName.endsWith(".json")) {
                              folder = "data";
                            } else if (tabName.endsWith(".py")) {
                              folder = "scripts";
                            } else if (tabName.endsWith(".md")) {
                              folder = "docs";
                            } else if (tabName.endsWith(".go")) {
                              folder = "api";
                            } else if (tabName.endsWith(".pdf")) {
                              folder = "assets";
                            }

                            return (
                              <div
                                key={tabName}
                                onClick={() => setActiveFile(tabName)}
                                className={`flex items-center justify-between group/editor px-2 py-1 rounded cursor-pointer transition-all ${
                                  isActive 
                                    ? "bg-ide-editor/80 text-blue-400" 
                                    : "text-zinc-450 hover:bg-ide-editor/40 hover:text-zinc-200"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                    <X
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        closeTab(tabName, e);
                                      }}
                                      className="w-3.5 h-3.5 text-zinc-500 hover:text-white rounded hover:bg-zinc-800 p-0.5 hidden group-hover/editor:block cursor-pointer"
                                    />
                                    <FileCode className={`w-4 h-4 ${file.iconColor} group-hover/editor:hidden`} />
                                  </div>
                                  <span className="font-mono text-xs truncate">{tabName}</span>
                                  <span className="text-[9px] text-zinc-600 font-mono truncate pl-1">{folder}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Accordion 2: Workspace Directory */}
                    <div className="flex flex-col flex-1 min-h-0">
                      <div 
                        onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
                        className="flex items-center gap-1 px-3 py-1.5 text-zinc-450 hover:text-zinc-200 cursor-pointer bg-ide-sidebar/20 uppercase tracking-wider text-[10px] font-bold select-none border-b border-ide-border/20 font-sans"
                      >
                        {isWorkspaceOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
                        <span>portfolio-source</span>
                      </div>

                      {isWorkspaceOpen && (
                        <div className="flex-1 overflow-y-auto py-2">
                          <div 
                            className="flex items-center gap-1 px-4 py-1 text-zinc-300 hover:text-white cursor-pointer hover:bg-ide-bg/40 transition-colors font-sans"
                            onClick={() => setIsFolderOpen(!isFolderOpen)}
                          >
                            {isFolderOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />}
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
                                    className={`flex items-center justify-between px-3 py-1.5 rounded-l-md cursor-pointer transition-all border-l-2 ${
                                      isActive 
                                        ? "bg-ide-editor/80 text-blue-400 border-blue-500 font-medium" 
                                        : "hover:bg-ide-editor/40 border-transparent text-zinc-400 hover:text-zinc-250"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <FileCode className={`w-4 h-4 ${file.iconColor}`} />
                                      <span className="font-mono text-xs truncate">{file.name}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Static Settings/Info at bottom of Sidebar */}
                  <div className="p-3 border-t border-ide-border/50 bg-[#0a0c10]/40 text-xs text-zinc-500 flex flex-col gap-2 font-sans">
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
            <div className="flex-1 flex flex-col bg-ide-editor min-h-0 min-w-0">
              {/* Tabs Bar */}
              <div className="flex items-center bg-ide-tabs border-b border-ide-border select-none w-full overflow-hidden">
                {openTabs.map((tabName) => {
                  const file = FILES.find((f) => f.name === tabName) || FILES[0];
                  const isActive = activeFile === tabName;
                  return (
                    <div
                      key={tabName}
                      onClick={() => setActiveFile(tabName)}
                      className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1.5 md:py-2 border-r border-ide-border cursor-pointer transition-all shrink min-w-0 font-mono text-[10px] md:text-xs ${
                        isActive 
                          ? "bg-ide-editor text-white border-t-2 border-t-blue-500" 
                          : "bg-[#0b0d13] text-zinc-500 hover:bg-ide-editor/40 hover:text-zinc-300"
                      }`}
                    >
                      <FileCode className={`w-3 h-3 md:w-3.5 md:h-3.5 shrink-0 ${file.iconColor}`} />
                      <span className="truncate">{tabName}</span>
                      {openTabs.length > 1 && (
                        <X
                          className="w-2.5 h-2.5 md:w-3 md:h-3 text-zinc-500 hover:text-white rounded hover:bg-zinc-800 p-0.5 shrink-0"
                          onClick={(e) => closeTab(tabName, e)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Editor Body */}
              <div className={`flex-1 flex flex-col overflow-y-auto min-h-0 min-w-0 ${
                activeFile === "resume.pdf" ? "p-0" : "p-4 md:p-6"
              } ${
                activeFile === "suyash.ts" || activeFile === "contact.go" || activeFile === "resume.pdf" ? "scrollbar-none" : ""
              }`}>
                {children(activeFile, openFile)}
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#0a0c10] border-t border-ide-border text-zinc-400 text-xs select-none font-mono">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-[#161a23]/60 border border-ide-border px-2 py-0.5 rounded text-[11px] font-semibold text-blue-400">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>PORTFOLIO v2.0</span>
              </div>
              <a 
                href="https://github.com/SuyashBhavalkar3" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>main</span>
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-zinc-500">
              <span className="hidden sm:inline hover:text-zinc-300 cursor-default">Ln {cursorPos.line}, Col {cursorPos.col}</span>
              <span className="hidden sm:inline hover:text-zinc-300 cursor-default">Spaces: 2</span>
              <span className="hover:text-zinc-300 cursor-default">UTF-8</span>
              <span className="bg-[#161a23]/60 border border-ide-border px-2 py-0.5 rounded text-[11px] text-zinc-300">{activeFileInfo.lang}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
