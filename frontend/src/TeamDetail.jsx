import { FaqAccordion } from "./FaqAccordion.jsx";

export function TeamDetail({ team }) {
  if (!team) {
    return (
      <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
        左の一覧からチームを選択してください。
      </p>
    );
  }

  return (
    <article className="detail-fade">
      <header className="detail-section">
        <h2 className="detail-team-name">{team.name}</h2>
        <p className="detail-summary">{team.summary}</p>
      </header>

      <section className="detail-section" aria-labelledby="sec-tasks">
        <h3 id="sec-tasks" className="detail-section__label">
          業務内容
        </h3>
        <ul className="detail-list">
          {(team.tasks || []).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="detail-section" aria-labelledby="sec-systems">
        <h3 id="sec-systems" className="detail-section__label">
          使用している社内システム
        </h3>
        <table className="systems-table">
          <tbody>
            {(team.systems || []).map((s, i) => (
              <tr key={i}>
                <th scope="row">{s.name}</th>
                <td>{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="detail-section" aria-labelledby="sec-faq">
        <h3 id="sec-faq" className="detail-section__label">
          FAQ
        </h3>
        <FaqAccordion items={team.faq || []} />
      </section>
    </article>
  );
}
