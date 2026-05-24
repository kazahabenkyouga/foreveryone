import { CORE_SYSTEMS } from "./CoreSystemSection.jsx";

const GROUP_NAV_LINKS = [
  { id: "grp-infra", name: "インフラ基盤グループ" },
  { id: "grp-sec", name: "セキュリティ・ガバナンスグループ" },
  { id: "grp-app", name: "アプリケーション開発グループ" },
  { id: "grp-ops", name: "サービスデスク・運用グループ" },
];

export function DepartmentNavigationSection({ onGoHome, onOpenSystemPage, onOpenGroupPage }) {
  return (
    <section className="system-detail-navigation">
      <div className="container">
        <h2 className="system-detail-section__title">部署紹介</h2>
        <div className="system-detail-nav-row">
          <div className="system-detail-nav-block">
            <div className="system-detail-nav-systems-list">
              <button
                className="system-detail-nav-system-link system-detail-nav-system-link--top"
                onClick={() => {
                  window.scrollTo(0, 0);
                  onGoHome?.();
                }}
              >
                トップページへ戻る
              </button>
            </div>
          </div>

          <div className="system-detail-nav-block">
            <p className="system-detail-nav-label">基幹システム</p>
            <div className="system-detail-nav-systems-list">
              {CORE_SYSTEMS.map((sys) => (
                <button
                  key={sys.id}
                  className="system-detail-nav-system-link"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onOpenSystemPage?.(sys.id);
                  }}
                >
                  {sys.name}
                </button>
              ))}
            </div>
          </div>

          <div className="system-detail-nav-block">
            <p className="system-detail-nav-label">4グループ</p>
            <div className="system-detail-nav-systems-list">
              {GROUP_NAV_LINKS.map((grp) => (
                <button
                  key={grp.id}
                  className="system-detail-nav-system-link"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    onOpenGroupPage?.(grp.id);
                  }}
                >
                  {grp.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
