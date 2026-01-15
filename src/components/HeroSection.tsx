import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useRef, useCallback, useMemo } from "react";
import myImage from "/img.jpeg";

/**
 * HeroSection Component
 * Main hero section with interactive network visualization that responds to mouse movement.
 * Features: Profile image, introduction text, CTA buttons, and animated background elements.
 */

// Type Definitions
type NetworkNodeProps = Readonly<{
  x: number;
  y: number;
  delay: number;
  label: string;
  mouseX?: number;
  mouseY?: number;
  containerX?: number;
  containerY?: number;
  containerWidth?: number;
  containerHeight?: number;
}>;

// Network Node Component - Interactive with mouse repulsion
const NetworkNode = ({
  x,
  y,
  delay,
  label,
  mouseX = 0,
  mouseY = 0,
  containerX = 0,
  containerY = 0,
  containerWidth = 320,
  containerHeight = 320,
}: NetworkNodeProps) => {
  // Calculate absolute position and distance from mouse
  const nodeAbsX = containerX + (containerWidth * x) / 100;
  const nodeAbsY = containerY + (containerHeight * y) / 100;

  const distanceSquared =
    Math.pow(mouseX - nodeAbsX, 2) + Math.pow(mouseY - nodeAbsY, 2);
  const distance = Math.sqrt(distanceSquared);

  const MAX_DISTANCE = 120;
  const PUSH_FORCE = 20;
  const isNear = distance < MAX_DISTANCE;
  const influence = Math.max(0, 1 - distance / MAX_DISTANCE);

  // Calculate push direction
  const angle = Math.atan2(nodeAbsY - mouseY, nodeAbsX - mouseX);
  const pushX = isNear ? Math.cos(angle) * influence * PUSH_FORCE : 0;
  const pushY = isNear ? Math.sin(angle) * influence * PUSH_FORCE : 0;

  return (
    <motion.div
      animate={{ x: pushX, y: pushY }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="absolute flex flex-col items-center"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translateX(-50%)" }}
    >
      {/* Label Badge */}
      <motion.div
        initial={{ opacity: 0.6, scale: 0.9 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.15 }}
        className="px-3 py-1.5 rounded-full text-[8px] font-semibold whitespace-nowrap mb-2 uppercase tracking-wide"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.5))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--primary) / 0.3)",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.2), inset 0 1px 2px hsl(var(--primary) / 0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        {label}
      </motion.div>

      {/* Animated Dot */}
      <motion.div
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{
          opacity: [0.4, 0.5, 0.4],
          scale: 1,
        }}
        whileHover={{ scale: 1.5, opacity: 0.8 }}
        transition={{
          opacity: { duration: 4, delay, repeat: Infinity },
          scale: { duration: 0.3 },
        }}
        className="w-2 h-2 rounded-full bg-primary/70"
      />
    </motion.div>
  );
};

// Connecting lines between nodes
const NetworkLine = ({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.25, 0.5, 0.25] }}
    transition={{ duration: 4, delay, repeat: Infinity }}
    className="absolute w-full h-full"
    style={{ pointerEvents: "none" }}
  >
    <defs>
      <filter id="lineGlow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="hsl(var(--primary))"
      strokeWidth="1.5"
      filter="url(#lineGlow)"
    />
  </motion.svg>
);

// Floating geometric element
const FloatingGeometry = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: [0.2, 0.4, 0.2],
      y: [0, -12, 0],
      rotate: [0, 360]
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    className="absolute w-6 h-6 border border-primary/40 rounded-lg"
    style={{ pointerEvents: "none" }}
  />
);

const DataStream = ({ delay, duration }: { delay: number; duration: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.15, 0.35, 0.15] }}
    transition={{ duration: 4, delay, repeat: Infinity }}
    className="absolute w-full h-full"
    style={{ pointerEvents: "none" }}
  >
    <defs>
      <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M 30,30 Q 50,50 70,40 T 100,70"
      stroke="url(#streamGradient)"
      strokeWidth="2"
      fill="none"
      style={{ transform: "translate(0, 0)" }}
    />
  </motion.svg>
);

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const visualizationRef = useRef<HTMLDivElement>(null);

  // Memoized mouse handler to prevent unnecessary re-renders
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  // Reset mouse position when leaving the visualization area
  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -1000, y: -1000 });
  }, []);

  // Memoized container bounds
  const containerBounds = useMemo(() => {
    if (!visualizationRef.current) {
      return { left: 0, top: 0 };
    }
    const rect = visualizationRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between w-full">
          {/* Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-border bg-secondary">
              <img
                src={myImage}
                className="w-full h-full object-cover"
                alt="Profile picture"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full bg-primary/10" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left max-w-xl w-full lg:flex-1"
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

            {/* CTA Buttons */}
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

          {/* Interactive Network Visualization */}
          <motion.div
            ref={visualizationRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative w-80 h-80 flex-shrink-0 cursor-pointer"
          >
            {/* Circular Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-primary/10" />

            {/* Grid Pattern Background */}
            <svg
              className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
              style={{ pointerEvents: "none" }}
              aria-hidden="true"
            >
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
                </pattern>
              </defs>
              <circle cx="160" cy="160" r="160" fill="url(#grid)" opacity="0.08" />
            </svg>


            {/* Animated network nodes with mouse repulsion */}
            {/* Modern Circular Personality Network - 6 Core Traits */}
            {/* Arranged in a modern hexagonal orbit pattern */}
            <NetworkNode 
              x={50} 
              y={15} 
              delay={0} 
              label="Resilient" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />
            <NetworkNode 
              x={78} 
              y={27} 
              delay={0.2} 
              label="Proactive" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />
            <NetworkNode 
              x={82} 
              y={60} 
              delay={0.4} 
              label="Innovative" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />
            <NetworkNode 
              x={50} 
              y={85} 
              delay={0.6} 
              label="Collaborative" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />
            <NetworkNode 
              x={18} 
              y={60} 
              delay={0.8} 
              label="Detail-Oriented" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />
            <NetworkNode 
              x={22} 
              y={27} 
              delay={1.0} 
              label="Problem Solver" 
              mouseX={mousePosition.x} 
              mouseY={mousePosition.y} 
              containerX={containerBounds.left} 
              containerY={containerBounds.top} 
              containerWidth={320} 
              containerHeight={320} 
            />

            {/* Modern orbital network connections */}
            {/* Hexagon outer ring */}
            <NetworkLine x1={50} y1={15} x2={78} y2={27} delay={0} />
            <NetworkLine x1={78} y1={27} x2={82} y2={60} delay={0.15} />
            <NetworkLine x1={82} y1={60} x2={50} y2={85} delay={0.3} />
            <NetworkLine x1={50} y1={85} x2={18} y2={60} delay={0.45} />
            <NetworkLine x1={18} y1={60} x2={22} y2={27} delay={0.6} />
            <NetworkLine x1={22} y1={27} x2={50} y2={15} delay={0.75} />
            
            {/* Cross connections to center for modern effect */}
            <NetworkLine x1={50} y1={15} x2={50} y2={50} delay={0.9} />
            <NetworkLine x1={78} y1={27} x2={50} y2={50} delay={1.0} />
            <NetworkLine x1={82} y1={60} x2={50} y2={50} delay={1.1} />

            {/* Central pulsing core */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/25 border border-primary/50"
            />
            <motion.div
              animate={{
                scale: [1.4, 1.8, 1.4],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/30"
            />

            {/* Floating geometric elements */}
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <FloatingGeometry delay={0} duration={4} />
            </div>
            <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <FloatingGeometry delay={0.5} duration={5} />
            </div>
            <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2">
              <FloatingGeometry delay={1} duration={4.5} />
            </div>

            {/* Data stream visualization */}
            <div className="absolute inset-4">
              <DataStream delay={0} duration={4} />
            </div>

            {/* Subtle motion indicator at bottom */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/60"
            />
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