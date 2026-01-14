import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Autonomous Generative AI Agent for Presentation Creation",
    description: "Built an autonomous generative AI system that converts natural language prompts into professional PowerPoint presentations. Designed an agentic workflow using LangGraph with a Dockerized FastAPI backend for slide generation and image rendering, and a responsive React frontend for user interaction and file downloads. Enables fully automated, scalable, and production-ready presentation creation for business and academic use cases.",
    tags: [
      "Generative AI",
      "Agentic AI",
      "LangGraph",
      "FastAPI",
      "React",
      "TypeScript",
      "LLMs",
      "Docker",
      "AI Automation",
      "Prompt Engineering"
    ],
    github: "https://github.com/SuyashBhavalkar3/Autonomous_Generative_AI_Agent_for_Presentation_Creation",
    demo: "https://autonomous-generative-ai-agent-for.vercel.app/",
  },
  {
    title: "RAG-based Legal & Policy Document Assistant",
    description: "Developed an AI-powered document intelligence system enabling users to upload legal and policy PDFs and receive accurate, context-aware answers using Retrieval-Augmented Generation (RAG). Implemented OpenAI embeddings with FAISS vector search for semantic retrieval and built scalable APIs using FastAPI, supporting real-world legal research and compliance analysis workflows.",
    tags: [
      "Retrieval-Augmented Generation",
      "RAG",
      "LLMs",
      "LangChain",
      "Vector Databases",
      "FAISS",
      "FastAPI",
      "Python",
      "Document AI",
      "NLP"
    ],
    github: "https://github.com/SuyashBhavalkar3/RAG_based_Legal_and_Policy_Document_Assistant",
    demo: "https://rag-based-legal-and-policy-document.vercel.app/",
  },
  {
    title: "MRI-Based Brain Tumor Classification",
    description: "Designed and deployed a deep learning system for automated brain tumor detection from MRI scans using CNN architectures and EfficientNet. Built a full pipeline including image preprocessing (noise removal, skull stripping), data augmentation, feature extraction, and model evaluation to improve diagnostic accuracy and early disease detection, with a web interface for clinical-style interaction.",
    tags: [
      "Deep Learning",
      "Computer Vision",
      "CNN",
      "EfficientNet",
      "Medical AI",
      "Healthcare AI",
      "Python",
      "FastAPI",
      "Model Training",
      "Image Processing"
    ],
    github: "https://github.com/SuyashBhavalkar3/mri-brain-tumor-classification-efficientnet",
    demo: "https://mri-brain-tumor-classification-effi.vercel.app/",
  },
  {
    title: "Driver Drowsiness Detection System",
    description: "Engineered a real-time computer vision system to detect driver fatigue using facial landmark analysis and biometric indicators such as Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR). Integrated live video processing to trigger alerts during early signs of drowsiness, enhancing road safety through intelligent monitoring and behavioral analysis.",
    tags: [
      "Computer Vision",
      "Real-Time AI",
      "MediaPipe",
      "Facial Landmark Detection",
      "Python",
      "FastAPI",
      "AI Safety Systems",
      "Edge AI",
      "Video Analytics"
    ],
    github: "https://github.com/SuyashBhavalkar3/Driver_Drowsiness_Detection_System",
    demo: "https://driver-drowsiness-detection-system-sooty.vercel.app/",
  },
  {
    title: "CryptoLock – Secure Text Encryption Platform",
    description: "Developed a secure web-based encryption platform enabling users to protect sensitive information using modern cryptographic algorithms and PGP-based encryption techniques. Implemented a FastAPI backend with a React + Vite frontend to ensure secure data handling, confidentiality, and safe transmission across distributed systems.",
    tags: [
      "Cybersecurity",
      "Cryptography",
      "PGP Encryption",
      "Secure Systems",
      "FastAPI",
      "React",
      "Python",
      "Data Security",
      "Web Security"
    ],
    github: "https://github.com/SuyashBhavalkar3/CryptoLock-Text_encryption_using_cryptographic_algorithms",
    demo: "https://crypto-lock-text-encryption-using-c.vercel.app/",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            Featured Work
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col transition-shadow hover:shadow-lg">
                {/* Project Number */}
                <span className="text-6xl font-heading font-bold text-secondary-foreground/10 mb-4">
                  0{index + 1}
                </span>
                
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-full"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 rounded-full"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
