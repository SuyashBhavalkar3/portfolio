import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
// import myImage from "../../../Images/image.png";
import myImage from "../../public/img.jpeg";

export function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-border bg-secondary">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={myImage}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-primary/10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-xl"
          >
            <p className="text-sm uppercase tracking-widest text-primary font-medium mb-4">
              Welcome to my portfolio
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Hello, I'm <br />
              <span className="text-primary">Suyash Bhavalkar</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              A passionate developer crafting beautiful digital experiences.
              I specialize in building modern web applications with clean code
              and thoughtful user interfaces.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#resume"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get Resume
              </a>
              <a
                href="#projects"
                className="px-8 py-3 border border-border rounded-full font-medium text-foreground hover:bg-secondary transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-border rounded-full font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
