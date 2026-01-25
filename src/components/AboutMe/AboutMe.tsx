import React from "react";
import styles from "./AboutMe.module.css";
import portrait from "../../assets/portrait.jpg";
import aboutTitle from "../../assets/aboutTitle.png";

const AboutMe: React.FC = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        {/* Left: Photo */}
        <div className={styles.imageWrap}>
          <img src={portrait} alt="Amy Lee" />
        </div>

        {/* Right: Title + Text (grouped!) */}
        <div className={styles.right}>
          <img
            src={aboutTitle}
            alt="About Me"
            className={styles.titleImg}
            draggable={false}
          />

          <div className={styles.text}>
            <p>
              I’m Amy — a data science student at the University of Michigan who
              loves building things at the intersection of data, design, and technology.
              I enjoy turning complex ideas into intuitive, visual, and meaningful experiences.
              My current research interests are machine learning and big data!
            </p>
            <br></br>
            <p>
              Outside of coding, I love visual design, photography, and exploring creative
              ways to express myself. Reach out to me about any of these!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
