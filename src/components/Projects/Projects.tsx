import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

interface Project {
    title: string;
    image: string;
    description: string;
    category: string;
}

const allProjects: Project[] = [
    { title: "Flight Price Predictor", image: "/assets/flight.png", description: "A machine learning project to predict flight prices based on several features", category: "Machine Learning" },
    { title: "BTAA Data Visualization", image: "/assets/btaa.png", description: "A data visualization of the top 20 most visited national parks", category: "Data Visualization"},
    { title: "Diabetes Health Risk Predictor", image: "/assets/diabetes.png", description: "Predict diabetes risk based on health factors, using a random forest regressor", category: "Data Science"},
]

const Projects: React.FC = () => {
    const [filter, setFilter] = useState("All");

    const filtered = allProjects.filter(p => filter === "All" || p.category === filter);

    return (
        <section className={styles.projects} id="projects">
            <div className={styles.filter}>
                {["All", "Machine Learning", "Data Science"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}>{f}</button>
                ))}
            </div>
            <div className={styles.cards}>
                {filtered.map((p, i) => (
                    <ProjectCard key={i} {...p} />
                ))}
            </div>
        </section>
    );
};

export default Projects;