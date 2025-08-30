import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer} id="contact">
            <div className={styles.left}>
                <p>Email: amyllee@umich.edu</p>
                <a href="https://www.linkedin.com/feed/"><img src="/assets/linkedin.png" alt="LinkedIn"/></a>
            </div>
            <div className={styles.right}>
                <form>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <textarea placeholder="Email" required />
                    <button type="submit">Send</button>
                </form>
            </div>
        </footer>
    );
};

export default Footer;