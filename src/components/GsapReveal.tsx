"use client";

import { ReactNode, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/useGsap";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  type?: "fade-up" | "clip" | "scale" | "fade";
  delay?: number;
  duration?: number;
  margin?: string;
}

export default function GsapReveal({
  children,
  className = "",
  innerClassName = "",
  type = "fade-up",
  delay = 0,
  duration = 0.8,
  margin = "-10%",
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;

    const el = elementRef.current;
    
    // Set initial state
    if (type === "fade-up") {
      gsap.set(el, { opacity: 0, y: 50 });
    } else if (type === "clip") {
      gsap.set(el, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 20 });
    } else if (type === "scale") {
      gsap.set(el, { opacity: 0, scale: 0.9 });
    } else if (type === "fade") {
      gsap.set(el, { opacity: 0 });
    }

    // Animate on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: `top ${100 - parseInt(margin)}%`,
      onEnter: () => {
        if (type === "fade-up") {
          gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "power3.out" });
        } else if (type === "clip") {
          gsap.to(el, { 
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)", 
            opacity: 1, 
            y: 0, 
            duration, 
            delay, 
            ease: "power4.out" 
          });
        } else if (type === "scale") {
          gsap.to(el, { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" });
        } else if (type === "fade") {
          gsap.to(el, { opacity: 1, duration, delay, ease: "power2.out" });
        }
      },
      once: true,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      <div ref={elementRef} className={innerClassName}>{children}</div>
    </div>
  );
}
