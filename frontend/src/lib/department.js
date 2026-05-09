const API_BASE = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
const API_PATH = API_BASE ? `${API_BASE}/department` : "/department";

export async function fetchDepartment() {
  const res = await fetch(API_PATH);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  const dept = data?.department;
  if (!dept?.groups) {
    throw new Error("レスポンス形式が不正です");
  }
  return dept;
}

export function pickFirstTeamId(groups) {
  for (const g of groups || []) {
    if (g.teams?.length) return g.teams[0].id;
  }
  return null;
}

export function findTeamById(groups, teamId) {
  for (const g of groups || []) {
    const hit = (g.teams || []).find((t) => t.id === teamId);
    if (hit) return hit;
  }
  return null;
}

export function findGroupByTeamId(groups, teamId) {
  for (const g of groups || []) {
    if ((g.teams || []).some((t) => t.id === teamId)) return g;
  }
  return null;
}
