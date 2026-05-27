"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor exactly on the point
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickSetter(cursor, "x", "px");
    const yTo = gsap.quickSetter(cursor, "y", "px");

    const updatePosition = (e: MouseEvent) => {
      // Instantly follow the mouse (no lag/lerping)
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[99999] hidden md:block shadow-md"
      style={{
        background: "var(--color-primary-red)",
      }}
    />
  );
}
