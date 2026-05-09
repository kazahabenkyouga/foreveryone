import { motion } from "framer-motion";
import { GroupIcon } from "../groups/GroupIcon.jsx";

const GROUP_THEME = {
  "grp-infra": {
    label: "INFRA",
    tags: ["#基盤構築", "#可用性", "#クラウド運用"],
  },
  "grp-sec": {
    label: "SECURITY",
    tags: ["#セキュリティ監視", "#IAM", "#リスク低減"],
  },
  "grp-app": {
    label: "APPLICATION",
    tags: ["#業務改善", "#内製開発", "#データ活用"],
  },
  "grp-ops": {
    label: "OPS",
    tags: ["#運用設計", "#変更管理", "#ヘルプデスク"],
  },
};

export function OrganizationStructure({
  groups,
  activeGroupId,
  onSelectGroup,
  onOpenGroupPage,
}) {
  const handleOpen = (groupId) => {
    onSelectGroup(groupId);
    onOpenGroupPage(groupId);
  };
  return (
    <section id="organization" className="section">
      <div className="container">
        <p className="eyebrow">Organization Structure</p>
        <h2 className="section-title">組織構造</h2>
        <div className="org-map" role="list" aria-label="部署の組織構造">
          {groups.map((group, idx) => (
            <motion.article
              key={group.id}
              className={`org-group org-group--${group.id} ${activeGroupId === group.id ? "org-group--active" : ""}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.06 }}
            >
              <header className="org-group__hero">
                <p className="org-group__badge">{GROUP_THEME[group.id]?.label || "GROUP"}</p>
                <div className="org-group__illustration" aria-hidden>
                  <GroupIcon groupId={group.id} className="group_icon org-group__illustration-icon" />
                </div>
              </header>
              <div className="org-group__body">
                <div>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </div>
                <p className="org-group__meta">{group.teams?.length || 0} Teams</p>
                <div className="org-group__tags">
                  {(GROUP_THEME[group.id]?.tags || []).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button type="button" className="org-group__link" onClick={() => handleOpen(group.id)}>
                  グループページを見る
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
