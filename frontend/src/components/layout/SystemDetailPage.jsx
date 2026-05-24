import { motion } from "framer-motion";
import { CORE_SYSTEMS } from "./CoreSystemSection.jsx";

const GROUP_NAV_LINKS = [
  { id: "grp-infra", name: "インフラ基盤グループ" },
  { id: "grp-sec", name: "セキュリティ・ガバナンスグループ" },
  { id: "grp-app", name: "アプリケーション開発グループ" },
  { id: "grp-ops", name: "サービスデスク・運用グループ" }
];

const SYSTEM_DETAILS = {
  erp: {
    name: "ERP（基幹業務システム）",
    subtitle: "会計・購買・在庫・人事など基幹業務を統合管理する中核システム",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop",
    overview: "全社の基幹業務プロセスを一元管理し、リアルタイムなデータ連携を実現するコア基盤。会計・購買・在庫・人事など複雑に連携する業務を効率化し、コンプライアンスの強化と意思決定スピードの向上をもたらします。",
    details: [
      "会計モジュール：決算業務の自動化と監査証跡の完全記録",
      "購買モジュール：発注から支払いまでの全プロセス管理",
      "在庫モジュール：リアルタイム在庫把握と最適化",
      "人事・給与モジュール：人事情報と給与計算の統合"
    ],
    features: [
      "ダッシュボード：主要KPI のリアルタイム可視化",
      "モバイルアクセス：外出先からの承認フロー対応",
      "API 連携：他システムとのシームレスな連携",
      "レポート機能：定型・カスタムレポートの自動生成"
    ],
    audience: [
      "経営層：経営判断に必要な経営指標データの取得",
      "財務・会計部門：決算業務と財務分析",
      "購買・物流部門：発注・在庫・支払い管理",
      "人事部門：給与計算と人事情報管理"
    ]
  },
  crm: {
    name: "CRM（顧客管理システム）",
    subtitle: "顧客情報・商談・問い合わせ履歴を集約し、継続的な関係構築を支援",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=500&fit=crop",
    overview: "顧客とのあらゆる接点のデータを一元管理し、顧客ライフサイクル全体を通じた最適な対応を実現するプラットフォーム。営業効率の向上と顧客満足度の向上の両立をもたらします。",
    details: [
      "顧客情報管理：統一された顧客マスタデータベース",
      "営業管理：商談進捗と予測売上の可視化",
      "問い合わせ管理：サポートチケットの一元化",
      "キャンペーン管理：顧客セグメント別マーケティング"
    ],
    features: [
      "営業パイプライン：段階別商談進捗の管理と分析",
      "顧客カスタマイズビュー：営業スタイルに合わせた表示",
      "自動ワークフロー：定型業務の自動実行",
      "メール統合：顧客とのやり取り履歴の自動記録"
    ],
    audience: [
      "営業チーム：商談管理と営業予報",
      "マーケティング部門：キャンペーン実施と効果測定",
      "カスタマーサクセス：顧客満足度向上",
      "管理職：営業成績と顧客動向の把握"
    ]
  },
  itsm: {
    name: "ITSM（ITサービス管理）",
    subtitle: "問い合わせ対応・障害管理・変更管理を標準化し、安定運用を実現",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=600&h=500&fit=crop",
    overview: "IT サービスの品質と安定性を組織的に向上させる総合プラットフォーム。インシデント対応から変更管理まで、IT 運用のベストプラクティスを実装し、ユーザー満足度の向上と運用コストの削減を実現します。",
    details: [
      "インシデント管理：問い合わせから解決までの可視化",
      "障害管理：本番環境障害の素早い対応",
      "変更管理：システム変更のリスク管理",
      "ナレッジベース：問題解決情報の蓄積と共有"
    ],
    features: [
      "チケッティング：優先度ベースの自動ルーティング",
      "エスカレーション：SLA 達成のための自動督促",
      "ナレッジ検索：AI による類似チケット推奨",
      "ダッシュボード：支援チームのパフォーマンス分析"
    ],
    audience: [
      "IT ヘルプデスク：日々のインシデント対応",
      "インフラチーム：システム安定性の維持",
      "IT マネージャー：サービス品質の管理",
      "全社ユーザー：問い合わせ対応"
    ]
  },
  bi: {
    name: "BI（データ分析基盤）",
    subtitle: "部門横断データを可視化し、意思決定のスピードと精度を高める分析基盤",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop",
    overview: "全社のデータを統合し、複雑なビジネスの真実を直感的に理解できる分析環境を提供。ERP・CRM・ITSM など複数システムのデータを融合させ、経営層から現場まで全組織の意思決定を高度化します。",
    details: [
      "データウェアハウス：全社データの統一管理",
      "ダッシュボード：リアルタイム経営指標の可視化",
      "分析レポート：深掘り分析による洞察提供",
      "予測分析：機械学習による将来予測"
    ],
    features: [
      "セルフサービス BI：ノンテック層による探索的分析",
      "モバイル BI：スマートフォンでのデータ確認",
      "ガバナンス機能：データ品質と権限管理",
      "コラボレーション：分析結果の共有と議論"
    ],
    audience: [
      "経営層：経営指標と経営判断",
      "各部門長：部門別パフォーマンス分析",
      "データ分析者：深掘り分析と洞察創出",
      "意思決定者：根拠ある経営判断"
    ]
  }
};

export function SystemDetailPage({ systemId, onBack }) {
  const system = SYSTEM_DETAILS[systemId];
  const allSystems = CORE_SYSTEMS;

  if (!system) {
    return (
      <div className="system-detail-page">
        <div className="container">
          <button className="btn-back" onClick={onBack}>
            ← 戻る
          </button>
          <p>システムが見つかりません</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="system-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ヘッダー */}
      <section className="system-detail-header">
        <div className="container">
          <button className="btn-back" onClick={onBack}>
            ← 戻る
          </button>
          <div className="system-detail-header__inner">
            <motion.div
              className="system-detail-header__content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="system-detail-header__title">{system.name}</h1>
              <p className="system-detail-header__subtitle">{system.subtitle}</p>
            </motion.div>
            <motion.div
              className="system-detail-header__image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={system.image} alt={system.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* オーバービュー */}
      <section className="system-detail-section system-detail-overview">
        <div className="container">
          <h2 className="system-detail-section__title">システム概要</h2>
          <p className="system-detail-section__text">{system.overview}</p>
        </div>
      </section>

      {/* システム詳細 */}
      <section className="system-detail-section system-detail-details">
        <div className="container">
          <h2 className="system-detail-section__title">システム詳細</h2>
          <div className="system-detail-grid">
            {system.details.map((detail, idx) => (
              <motion.div
                key={idx}
                className="system-detail-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
              >
                <div className="system-detail-card__number">{String(idx + 1).padStart(2, "0")}</div>
                <p className="system-detail-card__text">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="system-detail-section system-detail-features">
        <div className="container">
          <h2 className="system-detail-section__title">主な機能</h2>
          <div className="system-detail-features-list">
            {system.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="system-detail-feature-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
              >
                <div className="system-detail-feature-item__dot"></div>
                <p className="system-detail-feature-item__text">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 対象となる人 */}
      <section className="system-detail-section system-detail-audience">
        <div className="container">
          <h2 className="system-detail-section__title">対象となる人</h2>
          <div className="system-detail-audience-grid">
            {system.audience.map((person, idx) => (
              <motion.div
                key={idx}
                className="system-detail-audience-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.05 }}
              >
                <p className="system-detail-audience-card__text">{person}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ナビゲーション */}
      <section className="system-detail-navigation">
        <div className="container">
          <h2 className="system-detail-section__title">部署紹介</h2>
          <div className="system-detail-nav-row">

            <div className="system-detail-nav-block">
              <div className="system-detail-nav-systems-list">
                <button className="system-detail-nav-system-link system-detail-nav-system-link--top" onClick={() => { window.scrollTo(0, 0); onBack(); }}>
                  トップページへ戻る
                </button>
              </div>
            </div>

            <div className="system-detail-nav-block">
              <p className="system-detail-nav-label">基幹システム</p>
              <div className="system-detail-nav-systems-list">
                {allSystems.map((sys) => (
                  <button
                    key={sys.id}
                    className="system-detail-nav-system-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.hash = `system=${sys.id}`;
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
                {GROUP_NAV_LINKS.map((group) => (
                  <button
                    key={group.id}
                    className="system-detail-nav-system-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.hash = `group=${group.id}`;
                    }}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
