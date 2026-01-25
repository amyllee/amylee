import React, { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "./ProjectCard";
import styles from "./Projects.module.css";
import projectsTitle from "../../assets/projectsTitle.png";

import flights from "../../assets/flights.png";
import btaa from "../../assets/btaa.jpg";
import diabetes from "../../assets/diabetes.png";
import zetapi from "../../assets/zetapi.png";
import personalWebsite from "../../assets/personalWebsite.png";
import feedme from "../../assets/feedme.png";

import Modal from "../Modal/Modal";
import modalStyles from "../Modal/Modal.module.css";

const allProjects: Project[] = [
  {
    title: "BTAA Data Visualization",
    image: btaa,
    description:
      "A data visualization of the top 20 most visited national parks for the Big Ten Academic Alliance contest (chosen to represent UMich).",
    category: "Data Science",
    bullets: [
      "Built a clear narrative around visitation trends and ranking comparisons.",
      "Designed for poster-style readability and competition judging.",
    ],
    tech: ["Tableau", "Adobe Illustrator"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee" }],
  },
  {
    title: "Diabetes Health Risk Predictor",
    image: diabetes,
    description:
      "Predict diabetes risk based on health factors using a Decision Tree Classifier, with Matplotlib visualizations.",
    category: "Data Science",
    bullets: [
      "Trained and evaluated a decision tree model for interpretability.",
      "Visualized decision boundaries/feature contributions to explain results.",
    ],
    tech: ["Python", "scikit-learn", "Matplotlib"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee/Diabetes-Risk-Predictor" }],
  },
  {
    title: "Zeta Pi Website",
    image: zetapi,
    description:
      "Redesigned and developed the Zeta Pi homepage for the new recruitment season.",
    category: "Web Dev",
    bullets: [
      "Designed a modern layout aligned with the organization's visual identity.",
      "Implemented responsive UI improvements and cleaner navigation.",
    ],
    tech: ["React", "CSS Modules", "Vite"],
    links: [{ label: "GitHub", url: "https://zetapi.tech/" }],
  },
  {
    title: "Flight Price Predictor",
    image: flights,
    description:
      "ML project predicting flight prices. Uses a Random Forest Regressor to predict fares from user inputs.",
    category: "Machine Learning",
    bullets: [
      "Trained Random Forest models (full + simplified) for comparison.",
      "Built an interactive Streamlit flow for user inputs + evaluation visuals.",
    ],
    tech: ["Python", "Random Forest", "Streamlit", "Jupyter Notebook"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee/Flight_Predictor" }],
  },
  {
    title: "Personal Website",
    image: personalWebsite,
    description:
      "Designed and developed my personal React-based website to display projects and design work.",
    category: "Web Dev",
    bullets: [
      "Built a modular component structure: Hero / Projects / Design Gallery.",
      "Optimized layout and added interactive elements for portfolio viewing.",
    ],
    tech: ["React", "Vite", "HTML/CSS"],
    links: [{ label: "Website", url: "https://amyllee.github.io/amylee/" }],
  },
  {
    title: "FeedMe",
    image: feedme,
    description:
      "Developed FeedMe, a full-stack mobile app in a team at MHacks, to reduce food waste and encourage community cooking, coordinating design, frontent, and backend development across a cross-functional team.",
    category: "Web Dev",
    bullets: [
      "Built dynamic recipe generation using the MealDB API and implemented real-time inventory tracking with Supabase database integration to improve usability and support personalized cooking goals",
    ],
    tech: ["React", "Supabase", "Typescript", "node.js"],
    links: [{ label: "DevPost", url: "https://devpost.com/software/feedme-gxs0n8" }],
  },
];

const FILTERS = ["All Projects", "Data Science", "Machine Learning", "Web Dev"] as const;
type Filter = (typeof FILTERS)[number];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return allProjects.filter(
      (p) => filter === "All Projects" || p.category === filter
    );
  }, [filter]);

  const featured =
    allProjects.find((p) => p.title === "Flight Price Predictor") ?? allProjects[0];

  return (
    <section className={styles.projects} id="projects">
      <img
        src={projectsTitle}
        alt="Projects"
        className={styles.sectionTitle}
      />

      {/* Featured / Currently */}
      <div className={styles["currently-section"]}>
        <img
          src={featured.image}
          alt={featured.title}
          className={styles["currently-image"]}
        />

        <div className={styles["currently-info"]}>
          <h3>Currently</h3>
          <p>
            My most recent project is a flight price predictor that I completed after being a part of the
            Michigan Data Science Team. I built an interactive Streamlit web app where users can choose
            between a full or simplified model, and input predictors like origin/destination cities,
            market share of the carrier, and quarter of the year.
          </p>

          <button
            type="button"
            onClick={() => setActiveProject(featured)}
            className={styles["currently-button"]}
          >
            View details
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filter}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? styles.activeFilter : undefined}
            type="button"
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className={styles.cards}>
        {filtered.map((p) => (
          <ProjectCard key={p.title} {...p} onOpen={setActiveProject} />
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!activeProject}
        title={activeProject?.title}
        onClose={() => setActiveProject(null)}
      >
        {activeProject ? (
  <div style={{ display: "grid", gap: "14px" }}>
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={activeProject.image}
        alt={activeProject.title}
        style={{ width: "100%", display: "block", height: "auto" }}
      />
    </div>

    <p style={{ margin: 0, fontSize: "1.02rem", lineHeight: 1.65, opacity: 0.92 }}>
      {activeProject.description}
    </p>

    {activeProject.tech?.length ? (
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 650, marginBottom: "8px" }}>
          Tools / Tech
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {activeProject.tech.map((t) => (
            <span
              key={t}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "999px",
                padding: "6px 10px",
                fontSize: "0.92rem",
                background: "rgba(0,0,0,0.02)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    ) : null}

    {activeProject.bullets?.length ? (
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 650, marginBottom: "8px" }}>
          Highlights
        </div>
        <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
          {activeProject.bullets.map((b, idx) => (
            <li key={idx} style={{ marginBottom: "6px" }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    ) : null}

    {activeProject.links?.length ? (
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 650, marginBottom: "8px" }}>
          Links
        </div>
        <div className={modalStyles.linksRow}>
          {activeProject.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={modalStyles.linkPill}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    ) : null}
  </div>
) : null}
      </Modal>
    </section>
  );
};

export default Projects;
