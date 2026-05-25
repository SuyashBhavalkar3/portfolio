"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  angle: number;
  speed: number;
}

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  maxOpacity: number;
  opacity: number;
  angle: number;
  speed: number;
}

interface FloatingShape {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  points: number; // 3 for triangle, 4 for square, 6 for hexagon
  color: string;
  alpha: number;
  angle: number;
  speed: number;
}

export default function GravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Core particles & objects lists
    let particles: Particle[] = [];
    let orbs: Orb[] = [];
    let shapes: FloatingShape[] = [];

    const particleCount = 65;
    const shapeCount = 6;
    
    // Aesthetic accent colors matching portfolio theme
    const colors = [
      "59, 130, 246",   // Blue
      "139, 92, 246",   // Purple
      "6, 182, 212",    // Cyan
      "236, 72, 153",   // Pink
      "16, 185, 129"    // Emerald
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Initialize Zero-G components
    const initSpace = () => {
      particles = [];
      orbs = [];
      shapes = [];

      // 1. Nebula Orbs (ambient background glow)
      const nebulaColors = [
        "25, 35, 65",   // Deep Blue
        "35, 20, 60",   // Deep Purple
        "15, 38, 45",   // Deep Teal
      ];
      for (let i = 0; i < 3; i++) {
        const radius = Math.random() * 150 + 250; // 250px - 400px
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius,
          color: nebulaColors[i % nebulaColors.length],
          maxOpacity: Math.random() * 0.06 + 0.04, // subtle blend
          opacity: 0.05,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003
        });
      }

      // 2. Stars / Particles (omnidirectional drifting)
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2.2 + 1.0;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = Math.random() * 0.3 + 0.15;
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius,
          color,
          alpha: baseAlpha,
          baseAlpha,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.004
        });
      }

      // 3. Floating Architectural Polygons
      const shapeColors = [
        "59, 130, 246",  // Blue
        "139, 92, 246",  // Purple
        "6, 182, 212"    // Cyan
      ];
      for (let i = 0; i < shapeCount; i++) {
        const size = Math.random() * 18 + 12; // 12px - 30px
        const points = [3, 4, 6][Math.floor(Math.random() * 3)]; // Triangle, Square, Hexagon
        const color = shapeColors[i % shapeColors.length];
        
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          points,
          color,
          alpha: Math.random() * 0.12 + 0.08,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.002
        });
      }
    };
    
    initSpace();

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;
      const maxDistance = 115; // Star link distance

      // --- 1. Draw Nebula Glows ---
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.angle += orb.speed;
        
        // Pulsate nebula opacity
        orb.opacity = orb.maxOpacity + Math.sin(orb.angle) * 0.01;

        // Bounce off edges to stay on screen
        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.vx *= -1;
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.vy *= -1;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.opacity})`);
        grad.addColorStop(1, "rgba(9, 10, 15, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 2. Update and Draw Floating Shapes ---
      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotationSpeed;
        s.angle += s.speed;
        
        // Zero-G float wobble
        s.x += Math.sin(s.angle) * 0.05;
        s.y += Math.cos(s.angle) * 0.05;

        // Keep inside screen
        if (s.x - s.size < 0 || s.x + s.size > canvas.width) s.vx *= -1;
        if (s.y - s.size < 0 || s.y + s.size > canvas.height) s.vy *= -1;

        // Mouse proximity spin-up & gentle push
        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (220 - dist) / 220;
            // Accelerate rotation speed based on cursor proximity
            s.rotationSpeed = (s.rotationSpeed > 0 ? 1 : -1) * (Math.abs(s.rotationSpeed) + force * 0.012);
            // Move shape away slightly
            s.x += (dx / dist) * force * 0.6;
            s.y += (dy / dist) * force * 0.6;
          } else {
            // Smoothly decelerate to normal rotation speed
            const targetRot = s.rotationSpeed > 0 ? 0.003 : -0.003;
            s.rotationSpeed += (targetRot - s.rotationSpeed) * 0.05;
          }
        }

        // Draw Wireframe Shape
        ctx.beginPath();
        for (let i = 0; i < s.points; i++) {
          const angle = s.rotation + (i * Math.PI * 2) / s.points;
          const px = s.x + Math.cos(angle) * s.size;
          const py = s.y + Math.sin(angle) * s.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${s.color}, ${s.alpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Draw subtle glowing center node
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${s.alpha * 1.5})`;
        ctx.fill();
      });

      // --- 3. Update and Draw Star Particles ---
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.speed;
        
        // Zero-G float drift wobble
        p.x += Math.sin(p.angle) * 0.08;
        p.y += Math.cos(p.angle) * 0.08;

        // Mouse vortex orbit interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const force = (180 - dist) / 180;
            // Angle perpendicular to mouse for orbital velocity
            const orbitAngle = Math.atan2(dy, dx) + Math.PI / 2;
            
            // Vortex orbital forces
            const swirlX = Math.cos(orbitAngle) * force * 1.6;
            const swirlY = Math.sin(orbitAngle) * force * 1.6;
            // Soft gravitational pull towards mouse center
            const pullX = -Math.cos(Math.atan2(dy, dx)) * force * 0.4;
            const pullY = -Math.sin(Math.atan2(dy, dx)) * force * 0.4;

            p.x += swirlX + pullX;
            p.y += swirlY + pullY;
            p.alpha = Math.min(p.baseAlpha * 2.8, 0.75); // brighten stars in gravity well
          } else {
            p.alpha += (p.baseAlpha - p.alpha) * 0.04;
          }
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.04;
        }

        // Omnidirectional wraparound boundary
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Star halo glow if highly active
        if (p.alpha > 0.45) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.22})`;
          ctx.fill();
        }
      });

      // --- 4. Draw Star-to-Star Constellation Lines ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.09 * Math.min(p1.alpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- 5. Draw Shape-to-Star Connection Lines ---
      shapes.forEach((s) => {
        particles.forEach((p) => {
          const dx = s.x - p.x;
          const dy = s.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.12 * Math.min(s.alpha, p.alpha);
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${s.color}, ${alpha})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Cleanup listeners and animation frame on unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-transparent"
    />
  );
}
