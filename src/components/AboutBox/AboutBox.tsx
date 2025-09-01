import styles from "./AboutBox.module.css";

const AboutBox: React.FC = () => {
    return (
        <>
           <div className={styles.aboutBox} id="about">
                <div className={styles.header}>
                    <div>Welcome to my digital portfolio!</div>
                </div>
                <p>
                    I'm Amy Lee, an undergraduate at the University 
                    of Michigan, pursuing a B.S. in Data Science. My primary 
                    interests lie in applying machine learning and data analysis
                    to extract insights from large-scale data, with the goal of
                    creating real-world, positive impact. 
                    <br />
                    <br />
                    Beyond data, I am a passionate artist and dedicated
                    designer. For as long as I can remember, I've been creating
                    in some way, whether it's through graphic design, painting,
                    illustration, or programming. I enjoy blending my technical 
                    skills with my creative background to build meaningful projects.
                </p>
           </div>
        </>
    )
}

export default AboutBox;