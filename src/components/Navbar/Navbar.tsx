import React from "react";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <img src="../src/assets/logo.png" alt="Amy Logo" />
            </div>
            <ul className={styles.navLinks}>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#design">Design</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;