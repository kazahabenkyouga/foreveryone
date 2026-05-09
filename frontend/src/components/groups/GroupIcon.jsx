const ICONS = {
  "grp-infra": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v5H4zM6 13h4v5H6zM14 13h4v5h-4z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11v2m8-2v2M10 15h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  "grp-sec": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.8-2.8 7.8-7 9-4.2-1.2-7-4.2-7-9V6z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 11.8l1.9 1.9 3.8-3.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "grp-app": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="13" rx="2.3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20h6M12 17.5V20M7 9.5h10M7 12.5h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  "grp-ops": (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4.5a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zm-6.2 9.7a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8zm12.4 0a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10.7 8.6L7.5 14m6.8-5.4L17.5 14M8.1 16.5h7.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

export function GroupIcon({ groupId, className = "" }) {
  const classes = ["group-icon", className].filter(Boolean).join(" ");
  return <span className={classes}>{ICONS[groupId] || ICONS["grp-app"]}</span>;
}
