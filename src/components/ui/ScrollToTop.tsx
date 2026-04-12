"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: .8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: .8, y: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 z-40 w-11 h-11 rounded-2xl bg-accent text-dark shadow-xl shadow-accent/25 hover:bg-accent-light hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
