import React, { useMemo, useState } from "react";
import styles from "./ProjectsPage.module.css";
import projectsTitle from "../assets/site/projectsTitle.png";
import Modal from "../components/Modal/Modal";
import modalStyles from "../components/Modal/Modal.module.css";
import { FEATURED_PROJECT, PROJECTS, type Project } from "../data/projects";

const FILTERS = ["All", "Data Science & ML", "SWE", "Web Dev"] as const;
type Filter = (typeof FILTERS)[number];

const ProjectsPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const featured = PROJECTS.find((p) => p.title === FEATURED_PROJECT.title) ?? PROJECTS[0];

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const shown = PROJECTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <img src={projectsTitle} alt="Projects" className={styles.titleImg} draggable={false} />
        <p className={styles.intro}>
          Things I've built with data, models, and code — click any project for the details.
        </p>
      </header>

      {/* ── Currently ── */}
      <section className={styles.featured}>
        <button type="button" className={styles.featuredPhoto} onClick={() => setActive(featured)}>
          <span className={styles.tape} aria-hidden="true" />
          <img src={featured.image} alt={featured.title} />
        </button>
        <div className={styles.featuredText}>
          <p className="kicker">Currently</p>
          <h2 className={styles.featuredTitle}>{featured.title}</h2>
          <p className={styles.featuredBlurb}>{FEATURED_PROJECT.blurb}</p>
          <div className={styles.featuredActions}>
            <button type="button" className="btn" onClick={() => setActive(featured)}>
              View details
            </button>
            {featured.links?.[0] ? (
              <a className="btn btn-ghost" href={featured.links[0].url} target="_blank" rel="noopener noreferrer">
                {featured.links[0].label} ↗
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <div className={styles.filters} role="tablist" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={filter === f ? `${styles.chip} ${styles.chipActive}` : styles.chip}
            onClick={() => setFilter(f)}
          >
            {f}
            <span className={styles.chipCount}>{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* ── Project index ── */}
      <ol className={styles.list}>
        {shown.map((p, i) => (
          <li key={p.title} className={styles.row} style={{ ["--i" as string]: i }}>
            <button
              type="button"
              className={styles.rowPhoto}
              onClick={() => setActive(p)}
              aria-label={`Open details for ${p.title}`}
            >
              <img src={p.image} alt="" loading="lazy" />
            </button>

            <div className={styles.rowText}>
              <div className={styles.rowMeta}>
                <span className={styles.rowNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.rowCat}>{p.category}</span>
              </div>
              <h3 className={styles.rowTitle}>
                <button type="button" onClick={() => setActive(p)}>
                  {p.title}
                </button>
              </h3>
              <p className={styles.rowDesc}>{p.description}</p>
              {p.tech?.length ? (
                <div className={styles.pills}>
                  {p.tech.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className={styles.rowActions}>
                <button type="button" className={styles.textLink} onClick={() => setActive(p)}>
                  Read more →
                </button>
                {p.links?.map((l) => (
                  <a key={l.url} className={styles.textLink} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* ── Details pop-up ── */}
      <Modal isOpen={!!active} title={active?.title} onClose={() => setActive(null)}>
        {active ? (
          <div className={styles.detail}>
            <img src={active.image} alt={active.title} className={styles.detailImg} />
            <p className={styles.detailDesc}>{active.description}</p>

            {active.tech?.length ? (
              <div>
                <h4 className={styles.detailLabel}>Tools / Tech</h4>
                <div className={styles.pills}>
                  {active.tech.map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {active.bullets?.length ? (
              <div>
                <h4 className={styles.detailLabel}>Highlights</h4>
                <ul className={styles.detailList}>
                  {active.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {active.links?.length ? (
              <div>
                <h4 className={styles.detailLabel}>Links</h4>
                <div className={modalStyles.linksRow}>
                  {active.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className={modalStyles.linkPill}>
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default ProjectsPage;
