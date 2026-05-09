import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function FaqAccordion({ items }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(null);

  if (!items?.length) {
    return <p className="muted-text">FAQ は未登録です。</p>;
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
              <span>{item.question}</span>
              <span className="faq-icon" aria-hidden>
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="faq-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="faq-panel__inner">{item.answer}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
