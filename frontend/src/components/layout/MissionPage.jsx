import { motion } from "framer-motion";

const MISSION_PILLARS = [
  {
    id: "pillar-1",
    accent: "var(--blue)",
    eyebrow: "Pillar 01",
    title: "安全・安定な情報基盤の提供",
    body: "全社員が日々の業務に使うネットワーク・サーバ・クラウド環境を止まらず動かし続けます。インフラの信頼性こそが、すべての業務の土台です。セキュリティリスクを継続的に監視・低減し、安心して使えるデジタル環境を守ります。",
  },
  {
    id: "pillar-2",
    accent: "var(--accent-orange)",
    eyebrow: "Pillar 02",
    title: "業務改善・デジタル化の推進",
    body: "現場の課題を技術で解決します。業務システムの内製開発・改善を通じて、社員の生産性を高め、手作業をなくし、データに基づく意思決定を支援します。ITが「コスト」ではなく「武器」になる組織を目指します。",
  },
  {
    id: "pillar-3",
    accent: "var(--accent-teal)",
    eyebrow: "Pillar 03",
    title: "変化に強い運用体制の構築",
    body: "ビジネスの変化に追随できる柔軟な運用設計を担います。変更管理・リリース管理・サービスデスクを一体的に運営し、トラブル発生時には迅速に対応。再発防止のナレッジを蓄積し、組織全体の対応力を底上げします。",
  },
  {
    id: "pillar-4",
    accent: "var(--accent-purple)",
    eyebrow: "Pillar 04",
    title: "全社のデジタルリテラシー向上",
    body: "社員一人ひとりがITを正しく、安全に使えるよう支援します。問い合わせ対応・研修・ガイドライン整備を通じて、ITの知識を全社に広め、自律的に問題を解決できる組織文化を醸成します。",
  },
];

const MISSION_VALUES = [
  { label: "信頼性", description: "システムが止まらない仕組みを作り、守り続ける" },
  { label: "迅速性", description: "問題発生から解決まで、スピードを最優先する" },
  { label: "透明性", description: "状況を可視化し、関係者と情報をオープンに共有する" },
  { label: "継続改善", description: "現状に満足せず、常により良い方法を探し続ける" },
];

export function MissionPage({ department, onBack }) {
  return (
    <section className="section section-mission-page">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← トップに戻る
        </button>

        <motion.header
          className="mission-page__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="eyebrow">Department Vision</p>
          <h2 className="section-title">部署の存在意義</h2>
          <p className="mission-page__lead">{department?.mission}</p>
        </motion.header>

        {/* Why we exist */}
        <motion.div
          className="mission-why"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="mission-why__title">なぜこの部署が存在するのか</h3>
          <p className="mission-why__body">
            企業の競争力は、ITの質に直結しています。ネットワークが落ちれば業務が止まり、セキュリティが弱ければ信頼が失われ、システムが使いにくければ生産性は上がりません。
            当部署は、こうしたIT起因のリスクをゼロに近づけながら、テクノロジーを活用して全社の成長を加速させる役割を担います。
            単なる「ITの管理部門」ではなく、事業を支え・推進する「デジタルの推進力」として、全社員の働き方を変える存在です。
          </p>
        </motion.div>

        {/* 4 pillars */}
        <div className="mission-pillars">
          {MISSION_PILLARS.map((pillar, idx) => (
            <motion.article
              key={pillar.id}
              className="mission-pillar"
              style={{ "--pillar-accent": pillar.accent }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.08 }}
            >
              <p className="mission-pillar__eyebrow">{pillar.eyebrow}</p>
              <h4 className="mission-pillar__title">{pillar.title}</h4>
              <p className="mission-pillar__body">{pillar.body}</p>
            </motion.article>
          ))}
        </div>

        {/* Values */}
        <motion.div
          className="mission-values"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="mission-values__title">私たちが大切にすること</h3>
          <ul className="mission-values__list">
            {MISSION_VALUES.map((v) => (
              <li key={v.label} className="mission-values__item">
                <span className="mission-values__label">{v.label}</span>
                <span className="mission-values__desc">{v.description}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
