import { motion } from "framer-motion";

export function DepartmentVision({ department }) {
  const groupCount = department?.groups?.length || 0;
  const teamCount = (department?.groups || []).reduce(
    (sum, g) => sum + (g.teams?.length || 0),
    0,
  );

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
        </motion.div>
        <div className="vision-metrics">
          <div>
            <p className="metric-number">{groupCount}</p>
            <p className="metric-label">Groups</p>
          </div>
          <div>
            <p className="metric-number">{teamCount}</p>
            <p className="metric-label">Teams</p>
          </div>
          <div>
            <p className="metric-number">1</p>
            <p className="metric-label">Mission</p>
          </div>
        </div>
      </div>
    </section>
  );
}
