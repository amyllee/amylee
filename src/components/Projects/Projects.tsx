import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";
import flights from "../../assets/flights.png";
import btaa from "../../assets/btaa.jpg";
import diabetes from "../../assets/diabetes.png";
import zetapi from "../../assets/zetapi.png";
import personalWebsite from "../../assets/personalWebsite.png";

interface Project {
    title: string;
    image: string;
    description: string;
    category: string;
}

const allProjects: Project[] = [
    { title: "BTAA Data Visualization",
      image: btaa, 
      description: "A data visualization of the top 20 most visited national parks for the Big Ten Academic Alliance data visualization contest. This was chosen to represent UMich in the competition.", 
      category: "Data Science"
    },
    { title: "Diabetes Health Risk Predictor", 
      image: diabetes, 
      description: "Predict diabetes risk based on health factors, using a Decision Tree Classifier, and modeled by Matplotlib visualizations.", 
      category: "Data Science"
    },
    { title: "Zeta Pi Website",
      image: zetapi,
      description: "Redesigned and developed the Zeta Pi (Professional Technology Fraternity) homepage for the new recruitment season.",
      category: "Web Dev"
    },
    { title: "Flight Price Predictor", 
      image: flights, 
      description: "A machine learning project to predict flight prices based on several features. The model uses a Random Forest Regressor to predict fares with user input.", 
      category: "Machine Learning" 
    },
    {
      title: "Personal Website",
      image: personalWebsite,
      description: "Designed and developed my personal React-based website to display projects and design work.",
      category: "Web Dev"
    },
]

const Projects: React.FC = () => {
    const [filter, setFilter] = useState("All Projects");

    const filtered = allProjects.filter(p => filter === "All Projects" || p.category === filter);

    return (
        <section className={styles.projects} id="projects">
            <h2>Projects</h2>
            {/* Featured Project */}
            <div className={styles["currently-section"]}>
                <img
                    src={flights}
                    alt="Flight Price Predictor"
                    className={styles["currently-image"]}
                />
                <div className={styles["currently-info"]}>
                    <h3>Currently</h3>
                    <p>My most recent project is a flight price predictor that I completed after being a 
                        part of the Michigan Data Science Team. I built an interactive Streamlit web 
                        app where users can choose between a full or simplified model, and input predictors
                        like origin/destination cities, market share of the carrier, and quarter of the year.
                        The application uses Random Forest Regressor to train the model and is written in a
                        comprehensive Jupyter Notebook to document my process. Finally, users can choose
                        to visualize feature importance and compare the predicted vs. actual results.
                    </p>
                </div>
            </div>


            {/* Filter + carousel */}
            <div className={styles.filter}>
                {["All Projects", "Data Science", "Machine Learning", "Web Dev"].map(f => (
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