import { motion } from "framer-motion";

export function HeroSection({ showGrid = true, showBackground = true }) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      {showBackground ? <div className="hero-bg" aria-hidden /> : null}
      {showGrid ? <div className="hero-grid" aria-hidden /> : null}

      <header className="hero-header">
        <div className="container hero-header__inner">
          <a href="#top" className="hero-brand">部署紹介</a>
          <nav className="hero-nav" aria-label="Section navigation">
            <a href="#vision">Vision</a>
            <a href="#groups">Group</a>
            <a href="#systems">System</a>
          </nav>
        </div>
      </header>

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
          新しい一歩を、見通しのよい組織理解から始めましょう。
        </motion.p>
      </div>
    </section>
  );
}
