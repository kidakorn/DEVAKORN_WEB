"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-[90] transition-all backdrop-blur-md border"
          style={{
            background: "var(--bg-card)",
            borderColor: "var(--border-main)",
            color: "var(--color-primary-red)",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
          }}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.05, borderColor: "var(--color-primary-red)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
