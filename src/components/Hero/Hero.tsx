import React, { useState } from "react";
import styles from "./Hero.module.css";
import headshot from "../assets/headshot.jpg";
import illustrated from "../assets/illustrated.png"

const Hero: React.FC = () => {
    const [hover, setHover] = useState(false);

    return (
        <section className={styles.hero} id="hero">
            <div 
                className={styles.headshot}
                style={{ backgroundImage: `url(${hover ? illustrated : headshot})`}}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            ></div>
            <h1 className={styles.name}>Amy Lee</h1>
        </section>
    );
};

export default Hero;