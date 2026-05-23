"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, RefreshCw, Code, Layout, Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactFile() {
  const [viewMode, setViewMode] = useState<"visual" | "go">("visual");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<{ type: "idle" | "sending" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  const goCode = `package api

import (
	"encoding/json"
	"net/http"
)

type ContactForm struct {
	Name    string \`json:"name" binding:"required"\`
	Email   string \`json:"email" binding:"required,email"\`
	Message string \`json:"message" binding:"required"\`
}

func HandleContact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var form ContactForm
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Dispatching email payload to suyashbhavalkar82@gmail.com
	success := SendEmail(form) 
	if !success {
		http.Error(w, "Failed to send message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("{\\"status\\":\\"success\\"}"))
}
`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    setStatus({ type: "sending" });

    try {
      // 1. Fetch EmailJS keys from the backend securely
      const configRes = await fetch("/api/contact");
      if (!configRes.ok) {
        throw new Error("Failed to load configuration keys from the server.");
      }
      const config = await configRes.json();
      
      if (!config.publicKey || !config.serviceId || !config.templateId) {
        throw new Error("EmailJS credentials are not configured on the server.");
      }

      // 2. Import browser-side EmailJS dynamically
      const emailjs = (await import("@emailjs/browser")).default;

      // 3. Send email directly from the browser context to bypass the server 403 block
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          name: formData.name,
          email: formData.email,
        },
        config.publicKey
      );

      setStatus({ type: "success", message: "Message dispatched successfully via EmailJS Browser API!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Email dispatch failed:", err);
      setStatus({ 
        type: "error", 
        message: err.text || err.message || "Failed to dispatch message. Please try again later." 
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto py-2">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between border-b border-ide-border/50 pb-3 font-mono text-xs">
        <div className="text-zinc-500">
          <span>// contact.go - email dispatch system</span>
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
            <span>Interactive Form</span>
          </button>
          <button
            onClick={() => setViewMode("go")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded cursor-pointer transition-all ${
              viewMode === "go" 
                ? "bg-blue-600 text-white font-medium shadow-md" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Go Source</span>
          </button>
        </div>
      </div>

      {viewMode === "visual" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Struct display and details */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs text-zinc-400">
              <span className="text-code-keyword">type</span> <span className="text-code-function">ContactRequest</span> <span className="text-code-keyword">struct</span> {`{`}
              <div className="pl-4 mt-1">
                Name &nbsp;&nbsp;&nbsp; <span className="text-code-string">string</span> &nbsp;\`json:"name"\`
                <br />
                Email &nbsp;&nbsp;&nbsp;<span className="text-code-string">string</span> &nbsp;\`json:"email" binding:"email"\`
                <br />
                Message &nbsp;<span className="text-code-string">string</span> &nbsp;\`json:"message"\`
              </div>
              {`}`}
            </div>

            <div className="flex flex-col gap-3.5 text-zinc-400 leading-relaxed">
              <h3 className="text-zinc-350 font-medium text-sm">Direct Contact Channel</h3>
              <p className="text-xs">
                Feel free to fill out the form to trigger the automated **EmailJS** mail dispatcher. Your message will be routed directly to Suyash's inbox at:
              </p>
              
              <a 
                href="mailto:suyashbhavalkar82@gmail.com" 
                className="flex items-center gap-2 text-blue-400 font-mono text-xs hover:underline bg-[#1e2330]/40 p-3 border border-ide-border rounded"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                suyashbhavalkar82@gmail.com
              </a>

              <p className="text-xs">
                Response updates are logged in real-time under the status line below the form.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-ide-sidebar/55 border border-ide-border flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Request.Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded bg-ide-bg border border-ide-border focus:border-blue-500 text-zinc-300 placeholder-zinc-600 outline-none transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Request.Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded bg-ide-bg border border-ide-border focus:border-blue-500 text-zinc-300 placeholder-zinc-600 outline-none transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Request.Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded bg-ide-bg border border-ide-border focus:border-blue-500 text-zinc-300 placeholder-zinc-600 outline-none transition-colors resize-none font-mono"
                />
              </div>

              {/* Status Message Line */}
              {status.type !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2.5 p-3 rounded border text-xs font-mono ${
                    status.type === "success" 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                      : status.type === "error" 
                        ? "bg-red-950/20 border-red-500/20 text-red-400"
                        : "bg-blue-950/20 border-blue-500/20 text-blue-400"
                  }`}
                >
                  {status.type === "success" && <CheckCircle className="w-4 h-4 shrink-0" />}
                  {status.type === "error" && <AlertCircle className="w-4 h-4 shrink-0" />}
                  {status.type === "sending" && <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />}
                  <span>{status.message || "Dispatching contact request to server..."}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status.type === "sending"}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-md hover:shadow-blue-500/10 cursor-pointer ${
                  status.type === "sending" ? "opacity-50 cursor-not-allowed" : "hover:translate-y-[-1px]"
                }`}
              >
                <span>Send Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-ide-sidebar/40 border border-ide-border font-mono text-xs overflow-x-auto text-zinc-400 leading-relaxed">
          <pre className="text-zinc-300">
            {goCode.split("\n").map((line, lIdx) => {
              let highlighted = line;
              // Very simple Go highlighting
              if (line.startsWith("package ") || line.startsWith("import ") || line.startsWith("func ") || line.startsWith("type ") || line.startsWith("struct ")) {
                highlighted = line
                  .replace(/(package|import|func|type|struct|return|if|var)/g, '<span class="text-code-keyword">$1</span>');
              } else if (line.includes('"') || line.includes("`")) {
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
