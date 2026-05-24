export const CORE_SYSTEMS = [
    {
      id: "erp",
      name: "ERP（基幹業務システム）",
      description: "会計・購買・在庫・人事など基幹業務を統合管理する中核システムです。"
    },
    {
      id: "crm",
      name: "CRM（顧客管理システム）",
      description: "顧客情報・商談・問い合わせ履歴を集約し、継続的な関係構築を支援します。"
    },
    {
      id: "itsm",
      name: "ITSM（ITサービス管理）",
      description: "問い合わせ対応・障害管理・変更管理を標準化し、安定運用を実現します。"
    },
    {
      id: "bi",
      name: "BI（データ分析基盤）",
      description: "部門横断データを可視化し、意思決定のスピードと精度を高める分析基盤です。"
    }
  ];

export function CoreSystemSection({ onOpenSystemPage }) {

  return (
    <section id="systems" className="section section-core-systems">
      <div className="container">
        <p className="eyebrow">Core Systems</p>
        <h2 className="section-title">基盤システム</h2>
        <div className="core-system__list">
          {CORE_SYSTEMS.map((system, index) => (
            <button
              key={system.id}
              className="core-system__item"
              type="button"
              onClick={() => onOpenSystemPage(system.id)}
            >
              <div className="core-system__number">{String(index + 1).padStart(2, "0")}</div>
              <div className="core-system__content">
                <h3 className="core-system__name">{system.name}</h3>
                <p className="core-system__text">{system.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
