import React from "react";
import styles from "./DesignSection.module.css";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import frame3 from "../../assets/frame3.png";
import frame4 from "../../assets/frame4.png";
import frame5 from "../../assets/frame5.png";

const designWorks = [
    {
        src: frame1,
        title: "Rush T-shirt",
        description: "Designed the Zeta Pi (Professional Technology Fraternity) rush T-shirt for future recruitment seasons.",
        className: styles.item1
    },
    {
        src: frame2,
        title: "Okemos Woof Pack T-shirt",
        description: "Designed the merchandise for Okemos Woof Pack, creating personalized portraits for each dog.",
        className: styles.item2
    },
    {
        src: frame3,
        title: "Co-ex Postcard Design",
        description: "One of eight designs for a postcard series created during my study abroad at Yonsei International Summer School.",
        className: styles.item3
    },
    {
        src: frame4,
        title: "Okemos Solar Racing Club Logo",
        description: "Created the Okemos Solar Racing Club logo, featured on the solar car and organization's website.",
        className: styles.item4
    },
    {
        src: frame5,
        title: "BTAA Data Visualization",
        description: "Designed a poster visualizing the top 20 most visited National Parks for the BTAA Data Visualization Challenge.",
        className: styles.item5
    },
];

const DesignSection: React.FC = () => {
    return (
        <section className={styles.design} id="design">
            <h2>Design Work</h2>
            <div className={styles.gallery}>
                {designWorks.map((work, index) => (
                    <div key={index} className={`${styles.galleryItem} ${work.className}`}>
                        <img src={work.src} alt={work.title} className={styles.designImg} />
                        <div className={styles.overlay}>
                            <h3>{work.title}</h3>
                            <p>{work.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Portfolio Link */}
            <div className={styles.portfolioLink}>
                    <a href="https://drive.google.com/file/d/1Lr6eWKzb2QEXiGtvhSv9vmgNPRoe-hZq/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        Find my detailed mini design portfolio here
                    </a>
            </div>
        </section>
    );
};

export default DesignSection;