import { motion } from "framer-motion";

export function DepartmentVision({ department, onOpenMissionPage }) {
  return (
    <section id="vision" className="section section-vision">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="eyebrow">Department Vision</p>
          <h2 className="section-title">部署の存在意義</h2>
          <p className="section-copy">{department?.mission}</p>
          <button
            type="button"
            className="vision-detail-link"
            onClick={onOpenMissionPage}
          >
            部署の存在意義について説明します →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

