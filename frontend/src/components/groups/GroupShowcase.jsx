import { motion } from "framer-motion";
import { GroupIcon } from "./GroupIcon.jsx";

function pickTech(group) {
  const names = [];
  for (const team of group.teams || []) {
    for (const s of team.systems || []) {
      if (!names.includes(s.name)) names.push(s.name);
    }
  }
  return names.slice(0, 4);
}

export function GroupShowcase({ groups, activeGroupId, onSelectGroup, onOpenGroupPage }) {
  return (
    <section id="groups" className="section section-groups">
      <div className="container">
        <p className="eyebrow">Group Showcase</p>
        <h2 className="section-title">グループの違い</h2>
        <div className="group-list">
          {groups.map((group, index) => {
            const tech = pickTech(group);
            return (
              <motion.article
                key={group.id}
                className={`group-card group-card--${index % 4} ${
                  activeGroupId === group.id ? "group-card--active" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div>
                  <p className="group-index">{String(index + 1).padStart(2, "0")}</p>
                  <GroupIcon groupId={group.id} />
                </div>
                <div>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                  <dl>
                    <div>
                      <dt>mission</dt>
                      <dd>{group.description}</dd>
                    </div>
                    <div>
                      <dt>role</dt>
                      <dd>{(group.teams || []).map((t) => t.name).join(" / ")}</dd>
                    </div>
                    <div>
                      <dt>technologies</dt>
                      <dd>{tech.join(", ") || "TBD"}</dd>
                    </div>
                    <div>
                      <dt>challenge</dt>
                      <dd>{group.teams?.[0]?.tasks?.[0] || "継続的な改善を推進"}</dd>
                    </div>
                  </dl>
                  <div className="group-actions">
                    <button
                      type="button"
                      className="group-action-btn"
                      onClick={() => {
                        onSelectGroup(group.id);
                        onOpenGroupPage(group.id);
                      }}
                    >
                      グループページへ
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
