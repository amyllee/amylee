import React from "react";
import styles from "./DesignSection.module.css";

const DesignSection: React.FC = () => {
    return (
        <section className={styles.cards} id="design">
            <h2>Design</h2>
            <div className={styles.cards}>
            <img src="/assets/design1.png" alt="Design 1"/>
            <img src="/assets/design2.png" alt="Design "/>
            <img src="/assets/design3.png" alt="Design 3"/>
        </div>
        </section>
    );
};

export default DesignSection;