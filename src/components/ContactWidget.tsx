"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={widgetRef} className="fixed bottom-8 left-8 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-0 w-72 rounded-[2rem] p-8 shadow-2xl border backdrop-blur-2xl overflow-hidden"
            style={{
              background: "var(--glass-bg)",
              borderColor: "var(--border-main)",
            }}
          >
            {/* Ambient glow inside widget */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-red)] opacity-10 blur-[40px] pointer-events-none rounded-full" />

            <h4 className="text-xl font-bold mb-6 font-[var(--font-display)] text-[var(--text-strong)] relative z-10">
              Get in Touch
            </h4>
            
            <div className="flex flex-col gap-6 text-sm relative z-10" style={{ color: "var(--text-muted)" }}>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors group-hover:bg-[var(--color-primary-red)] group-hover:text-white" style={{ background: "var(--bg-hover)", color: "var(--color-primary-red)" }}>
                  <Mail size={16} />
                </div>
                <a href="mailto:kidakorn.1@gmail.com" className="font-medium hover:text-[var(--color-primary-red)] transition-colors">
                  kidakorn.1@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors group-hover:bg-[var(--color-primary-red)] group-hover:text-white" style={{ background: "var(--bg-hover)", color: "var(--color-primary-red)" }}>
                  <Phone size={16} />
                </div>
                <a href="tel:+66907596314" className="font-medium hover:text-[var(--color-primary-red)] transition-colors">
                  090-759-6314
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors group-hover:bg-[var(--color-primary-red)] group-hover:text-white" style={{ background: "var(--bg-hover)", color: "var(--color-primary-red)" }}>
                  <MapPin size={16} />
                </div>
                <span className="font-medium">Lamphun, Thailand</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all backdrop-blur-xl border-2"
        style={{
          background: "var(--glass-bg)",
          borderColor: isOpen ? "var(--color-primary-red)" : "var(--border-main)",
          color: isOpen ? "var(--color-primary-red)" : "var(--text-strong)",
        }}
        aria-label="Toggle Contact Widget"
        whileHover={{ scale: 1.05, borderColor: "var(--color-primary-red)", color: "var(--color-primary-red)" }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Phone size={24} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
