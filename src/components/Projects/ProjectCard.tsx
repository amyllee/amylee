import React from "react";
import styles from "./ProjectCard.module.css";

export type Project = {
  title: string;
  image: string;
  description: string;
  category: string;
  bullets?: string[];
  tech?: string[];
  links?: { label: string; url: string }[];
};

type ProjectCardProps = Project & {
  onOpen: (project: Project) => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ onOpen, ...project }) => {
  return (
    <button
      type="button"
      className={styles.card}
      onClick={() => onOpen(project)}
      aria-label={`Open details for ${project.title}`}
    >
      <img src={project.image} alt={project.title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
    </button>
  );
};

export default ProjectCard;
