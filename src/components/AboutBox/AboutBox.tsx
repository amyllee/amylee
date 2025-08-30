import styles from "./AboutBox.module.css";

const AboutBox: React.FC = () => {
    return (
        <>
           <div className={styles.aboutBox} id="about">
                <div className={styles.header}>
                    <div>Welcome to my digital portfolio!</div>
                </div>
                <p>
                    I'm Amy Lee, a current undergraduate at the University 
                    of Michigan, pursuing a B.S. in Data Science. I am largely 
                    interested in using machine models and data analysis to 
                    draw info from big data, in search of real positive 
                    applications.
                    <br />
                    <br />
                    Aside from data, I am a passionate artist and dedicated
                    designer. For as long as I can remember, I've been creating
                    in some way, whether it's through graphic design, painting,
                    illustration, or programming.
                </p>
           </div>
        </>
    )
}

export default AboutBox;