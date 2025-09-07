import React from "react";
import styles from "./Footer.module.css";
import linkedinIcon from "../../assets/linkedin.png"
import githubIcon from "../../assets/github.png"

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.contact}>
                <h3>Contact</h3>
                <p>amyllee@umich.edu</p>
                <div className={styles.socials}>
                    <a href="https://www.linkedin.com/in/amylee-data/" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
                    </a>
                    <a href="https://github.com/amyllee" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="Github" className={styles.socialIcon} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;