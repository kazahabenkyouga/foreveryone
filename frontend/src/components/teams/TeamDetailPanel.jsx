import { motion } from "framer-motion";
import { FaqAccordion } from "../common/FaqAccordion.jsx";

export function TeamDetailPanel({ team, groupName }) {
  if (!team) {
    return (
      <section id="team-detail" className="section">
        <div className="container">
          <p className="muted-text">チームを選択すると詳細が表示されます。</p>
        </div>
      </section>
    );
  }

  const relationships = [
    `同グループ内（${groupName || "各グループ"}）との横断連携`,
    "サービスデスク経由の要望取り込み",
    "変更管理チームとのリリース連携",
  ];

  const flow = ["課題整理", "設計・検証", "実装・展開", "運用改善"];

  return (
    <section id="team-detail" className="section section-team">
      <div className="container team-layout">
        <aside className="team-sticky">
          <p className="eyebrow">Team Detail</p>
          <h2 className="section-title">{team.name}</h2>
          <p className="section-copy">{team.summary}</p>
        </aside>

        <motion.div
          className="team-content"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <section>
            <h3>担当領域</h3>
            <ul>{(team.tasks || []).map((task, i) => <li key={i}>{task}</li>)}</ul>
          </section>

          <section>
            <h3>利用技術・システム</h3>
            <div className="chip-row">
              {(team.systems || []).map((s, i) => (
                <span key={i} className="chip" title={s.note}>
                  {s.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3>他チームとの関係</h3>
            <ul>{relationships.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </section>

          <section>
            <h3>業務フロー</h3>
            <ol className="flow-line">
              {flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3>雰囲気</h3>
            <p className="section-copy">
              継続改善とレビュー文化を重視し、技術判断をチームで合意しながら前進する風土です。
            </p>
          </section>

          <section>
            <h3>FAQ</h3>
            <FaqAccordion items={team.faq || []} />
          </section>
        </motion.div>
      </div>
    </section>
  );
}
