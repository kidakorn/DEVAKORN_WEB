"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2 seconds to match the reference
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg-main)]"
        >
          <div className="font-[var(--font-display)] text-3xl font-bold mb-5 animate-pulse tracking-widest text-[var(--text-strong)]">
            DEVAKORN
          </div>
          <div className="relative w-[200px] h-[2px] overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-[var(--color-primary-red)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
