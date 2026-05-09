import { useCallback, useEffect, useMemo, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection.jsx";
import { DepartmentVision } from "./components/layout/DepartmentVision.jsx";
import { OrganizationStructure } from "./components/organization/OrganizationStructure.jsx";
import { GroupShowcase } from "./components/groups/GroupShowcase.jsx";
import { GroupDetailPage } from "./components/groups/GroupDetailPage.jsx";
import { CultureSection } from "./components/layout/CultureSection.jsx";
import { fetchDepartment } from "./lib/department.js";

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
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [viewMode, setViewMode] = useState("home");

  const setGroupHash = (groupId) => {
    window.location.hash = groupId ? `group=${groupId}` : "";
  };

  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash.startsWith("group=")) {
      return { mode: "group", groupId: hash.replace("group=", "") };
    }
    return { mode: "home", groupId: null };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dept = await fetchDepartment();
      setPayload(dept);
      const firstGroupId = dept.groups?.[0]?.id || null;
      setSelectedGroupId((current) => current || firstGroupId);
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

  useEffect(() => {
    const syncFromHash = () => {
      const { mode, groupId } = parseHash();
      setViewMode(mode);
      if (groupId) setSelectedGroupId(groupId);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [parseHash]);

  const selectedGroup = useMemo(() => {
    if (!payload?.groups || !selectedGroupId) return null;
    return payload.groups.find((g) => g.id === selectedGroupId) || payload.groups[0] || null;
  }, [payload, selectedGroupId]);

  const handleOpenGroupPage = (groupId) => {
    setSelectedGroupId(groupId);
    setViewMode("group");
    setGroupHash(groupId);
  };

  const handleBackHome = () => {
    setViewMode("home");
    setGroupHash("");
  };

  if (loading && !payload) {
    return (
      <div className="site-root">
        <HeroSection />
        <div className="section">
          <LoadingShell />
        </div>
      </div>
    );
  }

  if (error && !payload) {
    return (
      <div className="site-root">
        <HeroSection />
        <div className="section">
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
    <div className="site-root">
      {viewMode !== "group" ? (
        <HeroSection
          showGrid={viewMode !== "group"}
          showBackground={viewMode !== "group"}
        />
      ) : null}
      <main className="content-main">
        {viewMode === "group" ? (
          <GroupDetailPage group={selectedGroup} onBack={handleBackHome} />
        ) : (
          <>
          <DepartmentVision department={payload} />
          <OrganizationStructure
            groups={payload.groups}
            activeGroupId={selectedGroup?.id}
            onSelectGroup={setSelectedGroupId}
            onOpenGroupPage={handleOpenGroupPage}
          />
          <GroupShowcase
            groups={payload.groups}
            activeGroupId={selectedGroup?.id}
            onSelectGroup={setSelectedGroupId}
            onOpenGroupPage={handleOpenGroupPage}
          />
          <CultureSection />
          </>
        )}
      </main>
    </div>
  );
}
