export function Sidebar({ department, selectedTeamId, onSelectTeam }) {
  const { name, mission, groups } = department;

  return (
    <aside className="app-sidebar" aria-label="グループとチーム一覧">
      <div className="app-sidebar__brand">
        <h1 className="app-sidebar__brand-title">{name}</h1>
        <p className="app-sidebar__brand-sub">構造と業務のクイックリファレンス</p>
      </div>
      {mission ? <p className="app-sidebar__dept-mission">{mission}</p> : null}

      <p className="app-sidebar__nav-label">ナビゲーション</p>
      <nav className="nav-scroll" aria-label="チーム階層">
        {groups.map((group) => (
          <div key={group.id} className="nav-group">
            <h2 className="nav-group__name">{group.name}</h2>
            {group.description ? (
              <p className="nav-group__desc">{group.description}</p>
            ) : null}
            <ul className="nav-team-list">
              {(group.teams || []).map((team) => (
                <li key={team.id}>
                  <button
                    type="button"
                    className={
                      "nav-team" +
                      (team.id === selectedTeamId ? " nav-team--active" : "")
                    }
                    onClick={() => onSelectTeam(team.id)}
                    aria-current={team.id === selectedTeamId ? "true" : undefined}
                  >
                    {team.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
