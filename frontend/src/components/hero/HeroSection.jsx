import { motion } from "framer-motion";

export function HeroSection({ showGrid = true, showBackground = true }) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      {showBackground ? <div className="hero-bg" aria-hidden /> : null}
      {showGrid ? <div className="hero-grid" aria-hidden /> : null}
      <div className="container hero-content">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Department Introduction
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          それぞれの役割が組織を前に進める。
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
        >
        </motion.p>
      </div>
    </section>
  );
}
