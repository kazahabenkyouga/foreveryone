import { useId, useState } from "react";

/**
 * FAQ をアコーディオン表示。開閉は1問ずつ（読みやすさ優先）。
 */
export function FaqAccordion({ items }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(null);

  if (!items?.length) {
    return (
      <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
        FAQ は未登録です。
      </p>
    );
  }

  return (
    <div className="faq-accordion" role="region" aria-label="よくある質問">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;
        return (
          <div key={index} className="faq-item">
            <button
              type="button"
              id={triggerId}
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="faq-trigger__q">{item.question}</span>
              <span className="faq-trigger__icon" aria-hidden>
                ▸
              </span>
            </button>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="faq-panel detail-fade"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
