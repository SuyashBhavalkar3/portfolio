import React from "react";
import { motion } from "framer-motion";

// Types
export type SkillItem = {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
};

export type SkillCategory = {
  title: string;
  skills: SkillItem[];
};

// Default skills organized by category
const defaultSkillSet: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React" },
      { name: "HTML" },
      { name: "PHP" },
    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      { name: "MySQL" },
      { name: "MongoDB" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Java" },
      { name: "C++" },
      { name: "Python" },
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
    title: "AI / Machine Learning",
    skills: [
      { name: "Artificial Intelligence" },
      { name: "Machine Learning" },
      { name: "Natural Language Processing" },
      { name: "Retrieval Augmented Generation" },
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
    title: "DevOps, Cloud & Version Control",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "Vercel" },
      { name: "Render" },
    ],
  },
];

// Props
interface SkillSetProps {
  skills?: SkillCategory[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const skillHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
  },
};

// Component
const SkillSet: React.FC<SkillSetProps> = ({ skills = defaultSkillSet }) => {
  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-accent font-medium mb-4">
            Tech Stack
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold mb-4 text-foreground">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            A comprehensive collection of technologies and expertise across frontend, backend, 
            AI/ML, and DevOps domains
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="group bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Category Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-6 text-primary flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></span>
                {category.title}
              </h3>

              {/* Skills List */}
              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={skillHover}
                    className="flex items-center justify-between gap-3 text-sm md:text-base cursor-default"
                  >
                    <span className="flex items-center gap-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {/* Skill dot indicator */}
                      <span className="inline-block w-2 h-2 rounded-full bg-accent group-hover:bg-primary transition-colors duration-300"></span>
                      {skill.name}
                    </span>
                    {skill.level && (
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs px-2.5 py-1 rounded-full border border-border bg-secondary/50 text-secondary-foreground whitespace-nowrap"
                      >
                        {skill.level}
                      </motion.span>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Category Footer Accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.6 }}
                className="mt-6 h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 origin-left rounded-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default SkillSet;