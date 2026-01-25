import React from "react";
import styles from "./Hero.module.css";

import nameCutout from "../../assets/nameCutout.png"; // <-- rename to your file
import rectImg from "../../assets/rect.jpg";
import cloverImg from "../../assets/clover.jpg";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>
        {/* Collage */}
        <div className={styles.collage} aria-hidden="true">
          {/* back layers */}
          <div className={styles.square}>
            <img src={rectImg} alt="" />
          </div>

          <div className={styles.clover}>
            <img src={cloverImg} alt="" />
          </div>

          {/* foreground name */}
          <img
            src={nameCutout}
            className={styles.nameCutout}
            alt="Amy Lee"
            draggable={false}
          />
        </div>

        {/* Text content */}
        <div className={styles.text}>
          <p className={styles.kicker}>Welcome to my digital portfolio</p>
          <p className={styles.blurb}>
            Hi! I’m Amy, a data science student at the University of Michigan who enjoys 
            blending data analysis, software development, and visual design. With a 
            background in fine arts, I love exploring creative ways to build data-driven, 
            meaningful, and intuitive tech experiences.
          </p>

          <div className={styles.ctaRow}>
            <a className={styles.primaryBtn} href="#projects">
              View projects
            </a>
            <a className={styles.secondaryBtn} href="#design">
              View design
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
