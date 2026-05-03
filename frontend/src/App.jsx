import { useCallback, useEffect, useMemo, useState } from "react";
import { Hero } from "./Hero.jsx";
import { Sidebar } from "./Sidebar.jsx";
import { TeamDetail } from "./TeamDetail.jsx";

const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
const API_PATH = API_BASE ? `${API_BASE}/department` : "/department";

function pickFirstTeamId(groups) {
  for (const g of groups || []) {
    if (g.teams?.length) return g.teams[0].id;
  }
  return null;
}

function findTeamById(groups, teamId) {
  for (const g of groups || []) {
    const hit = (g.teams || []).find((t) => t.id === teamId);
    if (hit) return hit;
  }
  return null;
}

function LoadingShell() {
  return (
    <div className="loading-root" aria-busy="true" aria-live="polite">
      <div className="loading-bar" />
      <div className="loading-body">
        <div className="loading-sidebar">
          <div className="skeleton-line skeleton-line--mid" />
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line" style={{ marginTop: "1rem" }} />
          <div className="skeleton-line skeleton-line--mid" />
          <div className="skeleton-line" />
        </div>
        <div className="loading-main">
          <div className="skeleton-line" style={{ width: "40%", marginBottom: "1rem" }} />
          <div className="skeleton-line skeleton-line--mid" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line--short" style={{ marginTop: "1.25rem" }} />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line--mid" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_PATH);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const dept = data?.department;
      if (!dept?.groups) {
        throw new Error("レスポンス形式が不正です");
      }
      setPayload(dept);
      setSelectedTeamId((current) => {
        if (current && findTeamById(dept.groups, current)) return current;
        return pickFirstTeamId(dept.groups);
      });
    } catch (e) {
      setError(e?.message || String(e));
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const selectedTeam = useMemo(() => {
    if (!payload?.groups || !selectedTeamId) return null;
    return findTeamById(payload.groups, selectedTeamId);
  }, [payload, selectedTeamId]);

  if (loading && !payload) {
    return (
      <div className="page-layout">
        <Hero />
        <div id="main-workspace" className="page-layout__workspace">
          <LoadingShell />
        </div>
      </div>
    );
  }

  if (error && !payload) {
    return (
      <div className="page-layout">
        <Hero />
        <div id="main-workspace" className="page-layout__workspace">
          <div className="error-banner" role="alert">
            <strong>データを取得できませんでした。</strong>
            <br />
            バックエンドを起動しているか確認してください（例: <code>cd backend</code> のうえ{" "}
            <code>uvicorn main:app --reload --port 8010</code>。Vite の proxy は 8010 向け）。
            <br />
            詳細: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Hero />
      <div id="main-workspace" className="page-layout__workspace">
        <div className="app-shell initial-fade">
          <Sidebar
            department={payload}
            selectedTeamId={selectedTeamId}
            onSelectTeam={setSelectedTeamId}
          />
          <main className="app-main">
            <div className="app-main__inner">
              <header className="main-header">
                <p className="main-header__label">選択中のチーム</p>
                <h2 className="main-header__title">
                  {selectedTeam ? selectedTeam.name : "—"}
                </h2>
              </header>
              <TeamDetail key={selectedTeam?.id ?? "empty"} team={selectedTeam} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
