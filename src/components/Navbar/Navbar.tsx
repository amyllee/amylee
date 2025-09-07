import React from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <a href="#hero">
                    <img src={logo} alt="Amy Logo" />
                </a>
            </div>
            <ul className={styles.navLinks}>
                <li><a href="#hero">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#design">Design</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;