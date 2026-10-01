import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import styles from "./HomePage.module.css";
import projectsTitle from "../assets/site/projectsTitle.png";
import sprout from "../assets/site/sprout.png";
import designTitle from "../assets/site/designTitle.png";
import { PROJECTS } from "../data/projects";
import { DESIGN_COLLECTIONS } from "../data/design";
import { EDUCATION, EXPERIENCE, type ResumeEntry } from "../data/resume";
import { CONTACT } from "../data/contact";
import bunnyYellow from "../assets/stickers/bunny3.png";
import starGreen from "../assets/stickers/star1.png";
import bunnyPink from "../assets/stickers/bunny2.png";
import starPurple from "../assets/stickers/star2.png";
import bunnyBlue from "../assets/stickers/bunny1.png";


const DIVIDER_STICKERS = [bunnyYellow, starGreen, bunnyPink, starPurple, bunnyBlue];

// images in preview
const DESIGN_PREVIEW_IDS = [
  "01-zeta-pi/04-rush-poster.png",
  "02-okemos-woof-pack/01-phoebe.png",
  "03-selected-work/02-coex-aquarium-postcard.jpg",
];
const allDesign = DESIGN_COLLECTIONS.flatMap((c) => c.items);
const designPreview = (
  DESIGN_PREVIEW_IDS.map((id) => allDesign.find((i) => i.id === id)?.src).filter(Boolean) as string[]
).concat(DESIGN_COLLECTIONS.map((c) => c.items[0].src))
  .slice(0, 3);
const projectPreview = PROJECTS.slice(0, 3).map((p) => p.image);

const EXPLORE = [
  {
    to: "/projects",
    titleImg: projectsTitle,
    title: "Projects",
    blurb: "Data science, machine learning, and web development — from flight price prediction to a hackathon app fighting food waste.",
    cta: "View all projects",
    preview: projectPreview,
    count: `${PROJECTS.length} projects`,
  },
  {
    to: "/design",
    titleImg: designTitle,
    title: "Design Work",
    blurb: "Illustration, merch, posters, and brand work for clubs, competitions, and communities I'm part of.",
    cta: "View the gallery",
    preview: designPreview,
    count: `${DESIGN_COLLECTIONS.reduce((n, c) => n + c.items.length, 0)} pieces`,
  },
];

const Entry: React.FC<{ e: ResumeEntry }> = ({ e }) => (
  <article className={styles.entry}>
    <div className={styles.entryHead}>
      <h4 className={styles.entryTitle}>{e.title}</h4>
      <span className={styles.entryDates}>{e.dates}</span>
    </div>
    <div className={styles.entryOrg}>
      <span>{e.org}</span>
      {e.location ? <span className={styles.entryLoc}>{e.location}</span> : null}
    </div>
    {e.bullets?.length ? (
      <ul className={styles.entryBullets}>
        {e.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

const HomePage: React.FC = () => {
  const exploreRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = exploreRef.current;
    if (!el) return;
    const update = () => {
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 70;
      // short section → pin under the header; tall section → pin when its bottom hits the screen bottom
      el.style.top = `${Math.min(nav, window.innerHeight - el.offsetHeight)}px`;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <>
      <Hero />

      {/* ── Projects + Design side-by-side ── */}
      <section className={styles.explore} aria-label="Explore" ref={exploreRef}>
        <img src={sprout} alt="" className={styles.sprout} draggable={false} />
        <p className={`kicker ${styles.centerKicker}`}>Take a look around</p>
        <div className={styles.exploreGrid}>
          {EXPLORE.map((card) => (
            <Link key={card.to} to={card.to} className={styles.exploreCard}>
              <div className={styles.fan} aria-hidden="true">
                {card.preview.map((src, i) => (
                  <span key={src + i} className={styles[`fan${i}`]}>
                    <img src={src} alt="" loading="lazy" />
                  </span>
                ))}
              </div>
              <img src={card.titleImg} alt={card.title} className={styles.exploreTitle} draggable={false} />
              <p className={styles.exploreBlurb}>{card.blurb}</p>
              <div className={styles.exploreFoot}>
                <span className={styles.exploreCount}>{card.count}</span>
                <span className={styles.exploreCta}>
                  {card.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Education × Experience ── */}
      <section className={styles.resume} aria-labelledby="resume-heading">
        <div className={styles.resumeInner}>
          <header className={styles.resumeHeader}>
            <h2 id="resume-heading" className={styles.resumeHeading}>
              Education <span className={styles.times}>×</span> Experience
            </h2>
            {CONTACT.resume ? (
              <a className="btn" href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
                Download résumé ↓
              </a>
            ) : null}
          </header>

          <div className={styles.resumeBlock}>
            <h3 className={styles.blockLabel}>Education</h3>
            <div className={styles.entries}>
              {EDUCATION.map((e) => (
                <Entry key={e.org + e.title} e={e} />
              ))}
            </div>
          </div>

          <div className={styles.resumeBlock}>
            <h3 className={styles.blockLabel}>Experience</h3>
            <div className={styles.entries}>
              {EXPERIENCE.map((e) => (
                <Entry key={e.org + e.title} e={e} />
              ))}
            </div>
          </div>
        </div>
                        {/* decorative sticker row */}
        <div className={styles.stickerRow} aria-hidden="true">
          {DIVIDER_STICKERS.map((src, i) => (
            <img key={i} src={src} alt="" className={styles.sticker} draggable={false} />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
