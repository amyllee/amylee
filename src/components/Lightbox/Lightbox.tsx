import React, { useEffect } from "react";
import styles from "./Lightbox.module.css";
import type { DesignCollection } from "../../data/design";

type Props = {
  collection: DesignCollection | null;
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  onSelect: (index: number) => void;
};

/** Instagram / Pinterest-style pop-up: big image on the left, details on the right. */
const Lightbox: React.FC<Props> = ({ collection, index, onClose, onStep, onSelect }) => {
  const isOpen = !!collection;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, onStep]);

  if (!collection) return null;
  const item = collection.items[index];
  const many = collection.items.length > 1;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
        ✕
      </button>

      {many ? (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
            aria-label="Next"
          >
            ›
          </button>
        </>
      ) : null}

      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.media} style={{ background: item.background ?? "#f3f1ec" }}>
          <img key={item.id} src={item.src} alt={item.title} className={styles.mediaImg} />
        </div>

        <aside className={styles.details}>
          <div className={styles.meta}>
            <span>{collection.title}</span>
            {many ? (
              <span>
                {index + 1} / {collection.items.length}
              </span>
            ) : null}
          </div>

          <h3 className={styles.title}>{item.title}</h3>
          {item.description ? <p className={styles.desc}>{item.description}</p> : null}

          {item.tools?.length ? (
            <div className={styles.block}>
              <h4 className={styles.label}>Tools</h4>
              <div className={styles.pills}>
                {item.tools.map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {collection.description ? (
            <div className={styles.block}>
              <h4 className={styles.label}>About this project</h4>
              <p className={styles.small}>{collection.description}</p>
            </div>
          ) : null}

          {many ? (
            <div className={`${styles.block} ${styles.more}`}>
              <h4 className={styles.label}>More from {collection.title}</h4>
              <div className={styles.thumbs}>
                {collection.items.map((it, i) => (
                  <button
                    key={it.id}
                    type="button"
                    className={i === index ? `${styles.thumb} ${styles.thumbActive}` : styles.thumb}
                    style={{ background: it.background ?? "#f3f1ec" }}
                    onClick={() => onSelect(i)}
                    aria-label={`Show ${it.title}`}
                  >
                    <img src={it.src} alt="" loading="lazy" className={it.fit === "contain" ? styles.thumbContain : undefined} />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default Lightbox;
