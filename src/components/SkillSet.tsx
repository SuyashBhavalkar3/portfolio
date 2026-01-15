import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Types
export type SkillItem = {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  proficiency?: number; // 0-100 percentage
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

// Default skills organized by category - Ordered by AI awareness
const defaultSkillSet: SkillCategory[] = [
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
    title: "Computer Science Fundamentals",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "Database Management Systems" },
      { name: "Microprocessors" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python" },
      { name: "Java" },
      { name: "C++" },
    ],
  },
  {
    title: "LLM & Agent Frameworks",
    skills: [
      { name: "LangChain" },
      { name: "LangGraph" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "Vite" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "PHP" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "FastAPI" },
      { name: "Restful APIs" },
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    title: "AI Tools & Libraries",
    skills: [
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "scikit-learn" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    title: "DevOps, Cloud & Version Control",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "Render" },
    ],
  },
];

// Props
interface SkillSetProps {
  skills?: SkillCategory[];
}

// Animation variants - Enhanced for better UX
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Component
const SkillSet: React.FC<SkillSetProps> = ({ skills = defaultSkillSet }) => {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
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

        {/* Skills by Category - 2 Column Layout */}
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
              {/* Category Header - Minimalist Design */}
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

              {/* Skills Grid - Flex Layout */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="flex flex-wrap gap-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.08, 
                      y: -4,
                      transition: { duration: 0.2 }
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

      {/* Subtle background decoration - minimal */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-primary/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-accent/2 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default SkillSet;