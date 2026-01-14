import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeSection() {
  // Replace this with your actual Google Drive resume link
  const resumeLink = "https://drive.google.com/file/d/1qfipqULfQ6h_8zEo7BopeagOW7drnpsJ/view?pli=1";

  return (
    <section className="py-24 bg-secondary/30" id="resume">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Download My Resume
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Get a comprehensive overview of my skills, experience, and education. 
            Feel free to download and share!
          </p>
          
          <Button
            size="lg"
            className="rounded-full px-8"
            asChild
          >
            <a href={resumeLink} target="_blank" rel="noopener noreferrer">
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
