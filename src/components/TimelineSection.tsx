import { Description } from "@radix-ui/react-toast";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import { machine } from "os";

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
    description: "Worked on data analysis and visualization projects.\nEDA data cleaning and preprocessing.Built pipelines for machine learning models.",
  },
  {
    type: "education",
    title: "Btech-Computer Science Engineering (Artificial Intelligence and Machine Learning)",
    organization: "Vishwakarma Institute of Technology, Pune",
    period: "2023 - Present",
    description: "CGPA : 8.39",
  },
];

export function TimelineSection() {
  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
            My Journey
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
            Education & Experience
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-background" />

                {/* Content Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {item.type === "education" ? (
                        <GraduationCap className="w-4 h-4 text-primary" />
                      ) : (
                        <Briefcase className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {item.organization}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
