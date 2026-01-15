import React from "react";
import { motion } from "framer-motion";

/**
 * SkillSet Component
 * Displays skills organized by category in a clean, animated 2-column grid layout
 * with smooth entrance animations and interactive hover effects.
 */

// Types
export type SkillItem = Readonly<{
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  proficiency?: number;
}>;

export type SkillCategory = Readonly<{
  title: string;
  skills: readonly SkillItem[];
}>;

interface SkillSetProps {
  readonly skills?: readonly SkillCategory[];
}

// Default skills organized by category - Ordered by AI awareness
const defaultSkillSet: readonly SkillCategory[] = [
  {
    title: "AI / Machine Learning",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "Natural Language Processing" },
      { name: "Retrieval Augmented Generation" },
    ],
  },
  {
    title: "AI Tools & Libraries",
    skills: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "scikit-learn" },
      { name: "NumPy" },
    ],
  },
  {
    title: "Data Processing",
    skills: [
      { name: "Pandas" },
      { name: "Database Management Systems" },
      { name: "Data Structures & Algorithms" },
    ],
  },
  {
    title: "LLM & Agent Frameworks",
    skills: [
      { name: "LangChain" },
      { name: "LangGraph" },
      { name: "RESTful APIs" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
      { name: "JavaScript" },
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "React" },
      { name: "Vite" },
      { name: "Bootstrap" },
      { name: "TypeScript" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "FastAPI" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "PHP" },
    ],
  },
  {
    title: "DevOps & System Foundations",
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
    ],
  },
] as const;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const categoryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
} as const;

const skillVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
} as const;

// Component
const SkillSet: React.FC<SkillSetProps> = ({ skills = defaultSkillSet }) => {
  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 md:mb-24"
        >
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            Technical Stack
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-4 text-foreground">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of technologies and tools I work with across frontend, backend, AI/ML,
            and DevOps domains
          </p>
        </motion.div>

        {/* Skills Grid - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.12,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-10"
            >
              {/* Category Header */}
              <div className="relative">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: "100%", opacity: 1 }}
                  transition={{
                    delay: categoryIndex * 0.12 + 0.05,
                    duration: 0.8,
                  }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-foreground/0 via-foreground/15 to-foreground/0"
                />
                <motion.h3
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: categoryIndex * 0.12,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                  className="text-base md:text-lg font-semibold text-foreground/85 tracking-wide uppercase relative"
                >
                  <span className="relative inline-block">
                    {category.title}
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: "100%", opacity: 1 }}
                      transition={{
                        delay: categoryIndex * 0.12 + 0.15,
                        duration: 0.7,
                      }}
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40"
                    />
                  </span>
                </motion.h3>
              </div>

              {/* Skills Container */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{
                      scale: 1.08,
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="group"
                  >
                    <div className="px-4 py-2.5 rounded-lg border border-border/50 bg-gradient-to-br from-secondary/40 to-secondary/20 hover:from-secondary/60 hover:to-secondary/40 hover:border-primary/50 transition-all duration-250 cursor-pointer shadow-sm hover:shadow-md hover:shadow-primary/10">
                      <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors duration-250">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default SkillSet;