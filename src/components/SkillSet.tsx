import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  BrainCircuit, 
  Cpu, 
  Database, 
  Bot, 
  Code2, 
  Layout, 
  Server, 
  Terminal,
  Zap
} from "lucide-react";

// Types
export type SkillItem = Readonly<{
  name: string;
  proficiency?: number;
}>;

export type SkillCategory = Readonly<{
  title: string;
  icon: React.ReactNode;
  skills: readonly SkillItem[];
}>;

// Default skills with icons
const skillsWithIcons: readonly SkillCategory[] = [
  {
    title: "AI / Machine Learning",
    icon: <BrainCircuit className="w-6 h-6" />,
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "Natural Language Processing" },
      { name: "Retrieval Augmented Generation" },
    ],
  },
  {
    title: "AI Tools & Libraries",
    icon: <Cpu className="w-6 h-6" />,
    skills: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "scikit-learn" },
      { name: "NumPy" },
    ],
  },
  {
    title: "Data Processing",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "Pandas" },
      { name: "Database Management Systems" },
      { name: "Data Structures & Algorithms" },
    ],
  },
  {
    title: "LLM & Agent Frameworks",
    icon: <Bot className="w-6 h-6" />,
    skills: [
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "Agentic AI" },
    ],
  },
  {
    title: "Programming Languages",
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Frontend Development",
    icon: <Layout className="w-6 h-6" />,
    skills: [
      { name: "React" },
      { name: "Vite" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend & Databases",
    icon: <Server className="w-6 h-6" />,
    skills: [
      { name: "FastAPI" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
    ],
  },
  {
    title: "DevOps & Systems",
    icon: <Terminal className="w-6 h-6" />,
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "Computer Networks" },
    ],
  },
];

const GridBackground = () => (
  <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden">
    <div className="absolute inset-0" style={{ 
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }} />
  </div>
);

const SkillSet: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="skills" className="py-32 relative bg-background overflow-hidden" ref={containerRef}>
      <GridBackground />
      
      {/* Dynamic Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4">
            Competencies
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-semibold mb-6">
            Technical Arsenal
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsWithIcons.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-8 rounded-[2rem] bg-secondary/10 backdrop-blur-xl border border-white/5 hover:border-primary/40 transition-all duration-500 relative flex flex-col items-center text-center">
                {/* Category Icon */}
                <div className="mb-6 p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                  {category.icon}
                </div>
                
                <h3 className="font-heading text-lg font-bold mb-8 text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>

                <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
                  {category.skills.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="px-3 py-1.5 rounded-lg bg-background/50 border border-border/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-primary hover:border-primary/30 transition-all relative overflow-hidden group/skill"
                    >
                      {skill.name}
                      {/* Pulse Effect */}
                      <motion.div
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: sIdx * 0.5 }}
                        className="absolute inset-0 bg-primary/10 pointer-events-none"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Technical Decors */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  ID: 0x{idx}F
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSet;