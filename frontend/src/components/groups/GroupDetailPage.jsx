import { motion } from "framer-motion";
import { GroupIcon } from "./GroupIcon.jsx";
import { FaqAccordion } from "../common/FaqAccordion.jsx";
import { CORE_SYSTEMS } from "../layout/CoreSystemSection.jsx";

const GROUP_NAV_LINKS = [
  { id: "grp-infra", name: "インフラ基盤グループ" },
  { id: "grp-sec", name: "セキュリティ・ガバナンスグループ" },
  { id: "grp-app", name: "アプリケーション開発グループ" },
  { id: "grp-ops", name: "サービスデスク・運用グループ" },
];

function pickFaq(group) {
  const all = [];
  for (const team of group.teams || []) {
    for (const qa of team.faq || []) all.push(qa);
  }
  return all.slice(0, 6);
}

const DAILY_SCHEDULE = {
  "grp-infra": [
    { time: "09:00", title: "監視ダッシュボード確認", detail: "夜間アラートとインフラ指標を確認し、当日の優先対応を整理します。" },
    { time: "10:00", title: "変更作業・レビュー", detail: "ネットワーク/クラウド設定のレビューと定常変更を実施します。" },
    { time: "11:00", title: "チーム定例", detail: "障害傾向、改善施策、今週のリスク項目を共有します。" },
    { time: "12:00-13:00", title: "昼休憩", detail: "チームでランチ、または各自でリフレッシュします。" },
    { time: "13:00", title: "構築・検証対応", detail: "新規依頼に対する設計・検証・手順書更新を進めます。" },
    { time: "15:30", title: "関連部署との連携", detail: "開発・運用チームと本番反映タイミングを調整します。" },
    { time: "17:00", title: "日次クローズ", detail: "作業ログを整理し、引き継ぎ事項を記録します。" },
  ],
  "grp-sec": [
    { time: "09:00", title: "セキュリティアラート確認", detail: "SIEM/EDRアラートを確認し、初動対応の優先度を決定します。" },
    { time: "10:00", title: "トリアージ", detail: "疑わしいイベントの切り分けと、必要時のエスカレーションを行います。" },
    { time: "11:30", title: "ポリシー・ルール更新", detail: "検知ルールやアクセス方針を見直し、運用に反映します。" },
    { time: "12:00-13:00", title: "昼休憩", detail: "昼休憩。" },
    { time: "13:00", title: "監査・申請対応", detail: "アクセス申請、MFA例外、監査依頼に対応します。" },
    { time: "15:00", title: "脅威ハント", detail: "ログ分析により潜在リスクを洗い出し、予防策を提案します。" },
    { time: "17:00", title: "日次レポート", detail: "当日の検知件数と重要インシデント状況を共有します。" },
  ],
  "grp-app": [
    { time: "09:00", title: "バックログ確認", detail: "問い合わせ・改善要求・不具合の優先度を整理します。" },
    { time: "10:00", title: "実装作業", detail: "機能開発、API連携、テストコード追加を進めます。" },
    { time: "11:30", title: "コードレビュー", detail: "品質観点と運用影響を確認してレビューします。" },
    { time: "12:00-13:00", title: "昼休憩", detail: "昼休憩。" },
    { time: "13:00", title: "仕様調整", detail: "業務部門と要件の詳細化・優先順位調整を行います。" },
    { time: "15:30", title: "検証・リリース準備", detail: "ステージング確認とリリース手順を最終確認します。" },
    { time: "17:00", title: "成果共有", detail: "進捗と課題をチームで共有し、翌日の計画を固めます。" },
  ],
  "grp-ops": [
    { time: "09:00", title: "問い合わせ受付開始", detail: "夜間チケットと優先度の高い依頼を確認します。" },
    { time: "10:00", title: "一次対応", detail: "サービスデスクとして初期対応・切り分けを実施します。" },
    { time: "11:30", title: "変更会議準備", detail: "本日の変更申請と影響範囲を事前確認します。" },
    { time: "12:00-13:00", title: "昼休憩", detail: "昼休憩。" },
    { time: "13:00", title: "変更・リリース調整", detail: "CAB運用、関係部署との調整、メンテ告知を進めます。" },
    { time: "15:30", title: "ナレッジ更新", detail: "FAQと対応手順を最新化し、再発防止を反映します。" },
    { time: "17:00", title: "日次締め", detail: "未完了案件を整理し、17:30までに引き継ぎを完了します。" },
  ],
};

const GROUP_SCHEDULE_IMAGES = {
  "grp-infra": "/1351.jpg",
  "grp-sec": "/1352.jpg",
  "grp-app": "/1353.jpg",
  "grp-ops": "/1354.jpg",
};

export function GroupDetailPage({ group, onBack }) {
  if (!group) return null;
  const schedule = DAILY_SCHEDULE[group.id] || DAILY_SCHEDULE["grp-app"];
  const scheduleImage = GROUP_SCHEDULE_IMAGES[group.id] || "/1351.jpg";

  return (
    <section className="section section-group-page">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← 一覧に戻る
        </button>
        <header className="group-page-header">
          <GroupIcon groupId={group.id} />
          <div>
            <p className="eyebrow">Group Page</p>
            <h2 className="section-title">{group.name}</h2>
            <p className="section-copy">{group.description}</p>
          </div>
        </header>

        <motion.div
          className="group-page-grid"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(group.teams || []).map((team) => (
            <article key={team.id} className="group-team-card">
              <h3>{team.name}</h3>
              <p>{team.summary}</p>
              <h4>担当領域</h4>
              <ul>
                {(team.tasks || []).slice(0, 3).map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>

        <section className="group-page-faq">
          <h3>Group FAQ</h3>
          <FaqAccordion items={pickFaq(group)} />
        </section>

        <section className={`group-schedule group-schedule--${group.id}`}>
          <p className="eyebrow">Daily Schedule</p>
          <h3>1日のスケジュール（9:00 - 17:30）</h3>
          <div className="group-schedule__content">
            <div className="group-schedule__timeline" role="list" aria-label={`${group.name} の1日スケジュール`}>
              {schedule.map((item, idx) => (
                <article key={`${item.time}-${idx}`} className="schedule-item" role="listitem">
                  <p className="schedule-item__time">{item.time}</p>
                  <div className={`schedule-item__dot${item.time.includes("12:00-13:00") ? " is-break" : ""}`} />
                  <div className="schedule-item__card">
                    <h4>{item.title}</h4>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <aside className="group-schedule__visual" aria-label={`${group.name} の業務イメージ`}>
              <img src={scheduleImage} alt={`${group.name} の業務イメージ`} loading="lazy" />
            </aside>
          </div>
        </section>

      </div>

      {/* ナビゲーション */}
      <section className="system-detail-navigation">
        <div className="container">
          <h2 className="system-detail-section__title">部署紹介</h2>
          <div className="system-detail-nav-row">

            <div className="system-detail-nav-block">
              <div className="system-detail-nav-systems-list">
                <button
                  className="system-detail-nav-system-link system-detail-nav-system-link--top"
                  onClick={() => { window.scrollTo(0, 0); onBack(); }}
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
                {GROUP_NAV_LINKS.map((grp) => (
                  <button
                    key={grp.id}
                    className="system-detail-nav-system-link"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.hash = `group=${grp.id}`;
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
    </section>
  );
}
