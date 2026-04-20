import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { useRef } from "react";

const timelineData = [
  {
    type: "work",
    title: "Gen AI Intern",
    organization: "CodeSpyder Technologies Private Limited",
    period: "July 2025 - January 2026",
    description: "Working on generative AI models and their real-world applications. Developed RAG-based systems and agentic AI solutions, including data preparation, model training, and evaluation.",
  },
  {
    type: "work",
    title: "Data Science Intern",
    organization: "Unified IT Solutions",
    period: "May 2024 - June 2024",
    description: "Worked on data analysis and visualization projects. Performed EDA, data cleaning, and preprocessing. Built pipelines for machine learning models.",
  },
  {
    type: "education",
    title: "Btech-Computer Science Engineering (AI & ML)",
    organization: "Vishwakarma Institute of Technology, Pune",
    period: "2023 - Present",
    description: "Specializing in AI and Machine Learning. Significant coursework in Neural Networks, NLP, and Computer Vision. Current CGPA: 8.39",
  },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-4">
            Professional Path
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground">
            Experience & Education
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated SVG Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-px z-0">
            <div className="h-full w-full bg-border/30 rounded-full overflow-hidden">
               <motion.div 
                className="w-full bg-primary origin-top h-full"
                style={{ scaleY: scrollSpring }}
              />
            </div>
          </div>

          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex items-center md:justify-between w-full ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <motion.div 
                  whileInView={{ 
                    backgroundColor: "hsl(var(--primary))",
                    scale: [1, 1.2, 1],
                    boxShadow: "0 0 20px hsl(var(--primary) / 0.5)"
                  }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute left-6 md:left-1/2 w-4 h-4 bg-border rounded-full -translate-x-1/2 z-10 ring-8 ring-background" 
                />

                {/* Content Card */}
                <div className="ml-16 md:ml-0 md:w-[45%]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-secondary/10 backdrop-blur-sm p-8 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {item.type === "education" ? (
                          <GraduationCap className="w-5 h-5 text-primary" />
                        ) : (
                          <Briefcase className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <span className="text-sm font-bold text-primary tracking-wide">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-medium mb-4 italic">
                      {item.organization}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty space for alternate side */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
