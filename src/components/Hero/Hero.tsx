import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.headshot}></div>
            <h1 className={styles.name}>Amy Lee</h1>
        </section>
    );
};

export default Hero;