"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="w-full h-full">
        {/* The Red Swipe Block */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] w-full h-screen pointer-events-none"
          style={{ background: "var(--color-primary-red)" }}
        />
        
        {/* The Page Content Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
