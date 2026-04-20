import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "AI-Driven Autonomous Recruitment & Assessment",
    description: "An AI-powered recruitment platform automates resume parsing, scheduling, and unbiased candidate screening using NLP and an adaptive interview bot.",
    tags: ["AI", "NLP", "FastAPI", "React", "WebSockets"],
    github: "https://github.com/SuyashBhavalkar3/AI-Driven-Autonomous-Recruitment-and-Candidate-Assesment-System",
    demo: "https://ai-driven-autonomous-recruitment-an.vercel.app/",
    image: "/projects/recruitment_ai.png"
  },
  {
    title: "Autonomous GenAI Agent for Presentations",
    description: "Built an autonomous system that converts natural language prompts into professional PowerPoint presentations using LangGraph and FastAPI.",
    tags: ["GenAI", "LangGraph", "FastAPI", "Docker", "LLMs"],
    github: "https://github.com/SuyashBhavalkar3/Autonomous_Generative_AI_Agent_for_Presentation_Creation",
    demo: "https://autonomous-generative-ai-agent-for.vercel.app/",
    image: "/projects/genai_ppt.png"
  },
  {
    title: "RAG-based Legal & Policy Assistant",
    description: "AI-powered document intelligence enabling users to upload PDFs and receive context-aware answers using RAG and vector search.",
    tags: ["RAG", "LangChain", "FAISS", "FastAPI", "Python"],
    github: "https://github.com/SuyashBhavalkar3/RAG_based_Legal_and_Policy_Document_Assistant",
    demo: "https://rag-based-legal-and-policy-document.vercel.app/",
    image: "/projects/legal_rag.png"
  },
  {
    title: "MRI-Based Brain Tumor Classification",
    description: "Deep learning system for automated brain tumor detection from MRI scans using CNN architectures and EfficientNet.",
    tags: ["Deep Learning", "Computer Vision", "CNN", "EfficientNet", "Medical AI"],
    github: "https://github.com/SuyashBhavalkar3/mri-brain-tumor-classification-efficientnet",
    demo: "https://mri-brain-tumor-classification-effi.vercel.app/",
    image: "/projects/brain_tumor.png"
  },
  {
    title: "Driver Drowsiness Detection System",
    description: "Real-time computer vision system to detect driver fatigue using facial landmark analysis and biometric indicators.",
    tags: ["Computer Vision", "Real-Time AI", "MediaPipe", "Python", "Safety"],
    github: "https://github.com/SuyashBhavalkar3/Driver_Drowsiness_Detection_System",
    demo: "https://driver-drowsiness-detection-system-sooty.vercel.app/",
    image: "/projects/drowsiness.png"
  },
  {
    title: "CryptoLock – Secure Text Encryption",
    description: "Secure web-based encryption platform protecting sensitive information using modern cryptographic algorithms and PGP.",
    tags: ["Cybersecurity", "Cryptography", "FastAPI", "React", "Security"],
    github: "https://github.com/SuyashBhavalkar3/CryptoLock-Text_encryption_using_cryptographic_algorithms",
    demo: "https://crypto-lock-text-encryption-using-c.vercel.app/",
    image: "/projects/cryptolock.png"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
            Curated Portfolio
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Feature Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full flex flex-col bg-secondary/20 backdrop-blur-md border border-white/5 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:border-primary/50 relative">
                {/* Project Image Header */}
                <div className="relative h-48 overflow-hidden">
                   <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>

                <div className="p-6 flex flex-col flex-grow relative">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5"
                      title="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-secondary/10 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Discover more innovative solutions, experimentations, and open-source contributions.
            </p>
            
            <Button
              size="lg"
              className="rounded-full px-8 h-14 font-bold text-lg group/btn overflow-hidden relative"
              asChild
            >
              <a 
                href="https://github.com/SuyashBhavalkar3" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 mr-3 group-hover/btn:scale-110 transition-transform" />
                View All on GitHub
              </a>
            </Button>

            {/* Aesthetic Detail */}
            <div className="mt-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold">
                Continuous Development
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
