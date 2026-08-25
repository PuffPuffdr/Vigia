"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface MouseGlowProps {
  children: ReactNode;
  className?: string;
}

export default function MouseGlow({ children, className }: MouseGlowProps) {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(30);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });

  const background = useMotionTemplate`radial-gradient(650px circle at ${springX}% ${springY}%, rgba(110,231,255,0.16), rgba(167,139,250,0.09) 40%, transparent 70%)`;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div
      className={`relative overflow-hidden ${className ?? ""}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background }} />
      {children}
    </div>
  );
}
