import React from "react";
import styles from "./AboutPage.module.css";
// ✏️ To change the photo, drop a new image in src/assets/site/ and update this line.
import portrait from "../assets/site/portrait.jpg";
import aboutTitle from "../assets/site/aboutTitle.png";
import linkedinIcon from "../assets/site/linkedin.png";
import githubIcon from "../assets/site/github.png";
import { CONTACT } from "../data/contact";
import { FRAMES } from "../data/frames";

const AboutPage: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.inner}>
        {/* Left: Photo */}
        <div className={styles.imageWrap}>
          <img src={portrait} alt="Amy Lee" />
        </div>

        {/* Right: Title + Text + Contact */}
        <div className={styles.right}>
          <img src={aboutTitle} alt="About Me" className={styles.titleImg} draggable={false} />

          <div className={styles.text}>
            <p>
              I’m Amy — a data science student at the University of Michigan who loves building things at the
              intersection of data, design, and technology. I enjoy turning complex ideas into intuitive, visual, and
              meaningful experiences. My current research interests are machine learning and big data!
            </p>
            <p>
              Outside of coding, I love matcha lattes, photography, and exploring creative ways to express myself.
              Reach out to me about any of these!
            </p>
          </div>

          <div className={styles.contactCard} id="contact-info">
            <p className="kicker">Get in touch</p>
            <a className={styles.email} href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <div className={styles.contactLinks}>
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <img src={linkedinIcon} alt="" /> LinkedIn
              </a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <img src={githubIcon} alt="" /> GitHub
              </a>
              {CONTACT.resume ? (
                <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  Résumé ↗
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo frame wall ── */}
      <div className={styles.wall}>
        {FRAMES.map((f) => (
          <figure key={f.slot} className={`${styles.frame} ${styles[`slot${f.slot}`]}`}>
            <img src={f.image} alt={f.caption} draggable={false} />
            <figcaption className={styles.frameTag}>{f.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;