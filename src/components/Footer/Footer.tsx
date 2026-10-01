import React from "react";
import styles from "./Footer.module.css";
import linkedinIcon from "../../assets/site/linkedin.png";
import githubIcon from "../../assets/site/github.png";
import { CONTACT } from "../../data/contact";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.contact}>
        <h3>Contact</h3>
        <p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
        <div className={styles.socials}>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
