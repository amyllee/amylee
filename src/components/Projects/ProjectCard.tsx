import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
    title: string;
    image: string;
    description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, image, description }) => {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} className={styles.image} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ProjectCard;