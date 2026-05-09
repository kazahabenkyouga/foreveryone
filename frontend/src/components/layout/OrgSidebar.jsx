export function OrgSidebar({ department, selectedTeamId, onSelectTeam }) {
  return (
    <aside className="org-sidebar" aria-label="組織ナビゲーション">
      <p className="org-sidebar__title">{department.name}</p>
      <p className="org-sidebar__subtitle">Organization Navigation</p>
      <nav>
        {(department.groups || []).map((group) => (
          <section key={group.id} className="org-sidebar__group">
            <h3>{group.name}</h3>
            <ul>
              {(group.teams || []).map((team) => (
                <li key={team.id}>
                  <button
                    type="button"
                    className={selectedTeamId === team.id ? "active" : ""}
                    onClick={() => {
                      onSelectTeam(team.id);
                      const el = document.getElementById("team-detail");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    {team.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
