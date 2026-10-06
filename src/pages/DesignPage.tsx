import React, { useCallback, useEffect, useState } from "react";
import styles from "./DesignPage.module.css";
import designTitle from "../assets/site/designTitle.png";
import { DESIGN_COLLECTIONS } from "../data/design";
import Lightbox from "../components/Lightbox/Lightbox";

type Open = { c: number; i: number } | null;

const DesignPage: React.FC = () => {
  const [open, setOpen] = useState<Open>(null);
  const [current, setCurrent] = useState(DESIGN_COLLECTIONS[0]?.anchor ?? "");

  const scrollToCollection = (anchor: string) => {
    document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Highlight the section you're looking at in the sticky bar
  useEffect(() => {
    const els = DESIGN_COLLECTIONS.map((c) => document.getElementById(c.anchor)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const step = useCallback(
    (d: number) =>
      setOpen((o) => {
        if (!o) return o;
        const n = DESIGN_COLLECTIONS[o.c].items.length;
        return { c: o.c, i: (o.i + d + n) % n };
      }),
    [],
  );

  return (
    <div className={styles.page}>
      {/* ── Title ── */}
      <header className={styles.header}>
        <img src={designTitle} alt="Design Work" className={styles.titleImg} draggable={false} />
        <p className={styles.intro}>
          A gallery of illustration, merch, posters, and brand work. Click any piece to see more.
          everything below.
        </p>
      </header>

      {/* ── Sticky section switcher ── */}
      <nav className={styles.subnav} aria-label="Design sections">
        <div className={styles.subnavInner}>
          {DESIGN_COLLECTIONS.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={current === c.anchor ? `${styles.subnavChip} ${styles.subnavActive}` : styles.subnavChip}
              onClick={() => scrollToCollection(c.anchor)}
            >
              {c.title}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Collections: title + even grid ── */}
      {DESIGN_COLLECTIONS.map((c, ci) => (
        <section key={c.slug} id={c.anchor} className={styles.collection}>
          <header className={styles.collectionHead}>
            <div className={styles.collectionTitleRow}>
              <h2 className={styles.collectionTitle}>{c.title}</h2>
              <span className={styles.collectionCount}>
                {c.items.length} {c.items.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
            {c.subtitle ? <p className={styles.collectionSubtitle}>{c.subtitle}</p> : null}
            {c.description ? <p className={styles.collectionDesc}>{c.description}</p> : null}
          </header>

          <div className={styles.grid}>
            {c.items.map((it, ii) => (
              <button
                key={it.id}
                type="button"
                className={styles.tile}
                style={{ background: it.background }}
                onClick={() => setOpen({ c: ci, i: ii })}
                aria-label={`Open ${it.title}`}
              >
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className={it.fit === "contain" ? styles.tileContain : styles.tileCover}
                />
                <span className={styles.tileOverlay}>
                  <span className={styles.tileTitle}>{it.title}</span>
                  {it.description ? <span className={styles.tileDesc}>{it.description}</span> : null}
                </span>
                <span className={styles.tileExpand} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <Lightbox
        collection={open ? DESIGN_COLLECTIONS[open.c] : null}
        index={open?.i ?? 0}
        onClose={() => setOpen(null)}
        onStep={step}
        onSelect={(i) => setOpen((o) => (o ? { c: o.c, i } : o))}
      />
    </div>
  );
};

export default DesignPage;
