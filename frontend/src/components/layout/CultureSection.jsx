import { motion } from "framer-motion";

const VALUES = ["挑戦を歓迎する", "技術で変える", "チームで解く"];

export function CultureSection() {
  return (
    <section id="culture" className="section section-culture">
      <div className="container">
        <p className="eyebrow">Culture / People</p>
        <h2 className="section-title">働く空気感</h2>
        <div className="culture-grid">
          {VALUES.map((value, i) => (
            <motion.article
              key={value}
              className="culture-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <p>{value}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
