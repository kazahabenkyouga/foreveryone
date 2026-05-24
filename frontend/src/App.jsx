import { useCallback, useEffect, useMemo, useState } from "react";
import { HeroSection } from "./components/hero/HeroSection.jsx";
import { DepartmentVision } from "./components/layout/DepartmentVision.jsx";
import { MissionPage } from "./components/layout/MissionPage.jsx";
import { OrganizationStructure } from "./components/organization/OrganizationStructure.jsx";
import { CoreSystemSection } from "./components/layout/CoreSystemSection.jsx";
import { SystemDetailPage } from "./components/layout/SystemDetailPage.jsx";
import { GroupShowcase } from "./components/groups/GroupShowcase.jsx";
import { GroupDetailPage } from "./components/groups/GroupDetailPage.jsx";
import { CultureSection } from "./components/layout/CultureSection.jsx";
import { DepartmentNavigationSection } from "./components/layout/DepartmentNavigationSection.jsx";
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
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const [viewMode, setViewMode] = useState("home");

  const scrollToTopInstant = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const setGroupHash = (groupId) => {
    window.location.hash = groupId ? `group=${groupId}` : "";
  };

  const setSystemHash = (systemId) => {
    window.location.hash = systemId ? `system=${systemId}` : "";
  };

  const parseHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash.startsWith("group=")) {
      return { mode: "group", groupId: hash.replace("group=", ""), systemId: null };
    }
    if (hash.startsWith("system=")) {
      return { mode: "system", groupId: null, systemId: hash.replace("system=", "") };
    }
    if (hash === "mission") {
      return { mode: "mission", groupId: null, systemId: null };
    }
    return { mode: "home", groupId: null, systemId: null };
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
      const { mode, groupId, systemId } = parseHash();
      setViewMode(mode);
      if (groupId) setSelectedGroupId(groupId);
      if (systemId) setSelectedSystemId(systemId);
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
    scrollToTopInstant();
    setSelectedGroupId(groupId);
    setViewMode("group");
    setGroupHash(groupId);
  };

  const handleBackHome = () => {
    scrollToTopInstant();
    setViewMode("home");
    setGroupHash("");
  };

  const handleOpenSystemPage = (systemId) => {
    scrollToTopInstant();
    setSelectedSystemId(systemId);
    setViewMode("system");
    setSystemHash(systemId);
  };

  const handleOpenMissionPage = () => {
    scrollToTopInstant();
    setViewMode("mission");
    window.location.hash = "mission";
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
      {viewMode === "home" ? (
        <HeroSection
          showGrid={viewMode !== "group"}
          showBackground={viewMode !== "group"}
        />
      ) : null}
      <main className="content-main">
        {viewMode === "group" ? (
          <GroupDetailPage group={selectedGroup} onBack={handleBackHome} />
        ) : viewMode === "system" ? (
          <SystemDetailPage systemId={selectedSystemId} onBack={handleBackHome} />
        ) : viewMode === "mission" ? (
          <MissionPage department={payload} onBack={handleBackHome} />
        ) : (
          <>
          <DepartmentVision department={payload} onOpenMissionPage={handleOpenMissionPage} />
          <OrganizationStructure
            groups={payload.groups}
            activeGroupId={selectedGroup?.id}
            onSelectGroup={setSelectedGroupId}
            onOpenGroupPage={handleOpenGroupPage}
          />
          <CoreSystemSection onOpenSystemPage={handleOpenSystemPage} />
          <GroupShowcase
            groups={payload.groups}
            activeGroupId={selectedGroup?.id}
            onSelectGroup={setSelectedGroupId}
            onOpenGroupPage={handleOpenGroupPage}
          />
          <CultureSection />
          <DepartmentNavigationSection
            onGoHome={handleBackHome}
            onOpenSystemPage={handleOpenSystemPage}
            onOpenGroupPage={handleOpenGroupPage}
          />
          </>
        )}
      </main>
    </div>
  );
}
