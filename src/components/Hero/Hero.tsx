import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

import nameCutout from "../../assets/site/nameCutout.png";

// Colors the stickers can be (pulled from the background palette)
const STICKER_COLORS = ["#7aa6e0", "#f3a9bd", "#b5cf85", "#f6b184", "#f2dc7c"];

type Sticker = { id: number; x: number; y: number; kind: "flower" | "star"; color: string; rot: number };

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const nextId = useRef(0);

  /* ── Mouse tracking ──
     We don't re-render React on every mouse move (that would be slow).
     Instead we write a few CSS variables onto the <section>:
       --mx, --my : mouse position from -1 to 1 (0 = center)   → tilt + parallax
       --px, --py : mouse position in pixels                    → cursor light
     The CSS file reads these variables to move things.
     The numbers are "eased" each frame so the motion feels smooth and floaty. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !hasMouse) return; // phones & reduced-motion: skip the mouse effects

    const target = { x: 0, y: 0 };  // where the mouse is
    const current = { x: 0, y: 0 }; // where the effect currently is (catches up to target)
    let frame = 0;

    const tick = () => {
      // move 8% of the remaining distance each frame → smooth "lag"
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      hero.style.setProperty("--mx", current.x.toFixed(4));
      hero.style.setProperty("--my", current.y.toFixed(4));

      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick); // stop the loop when nothing is moving
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      hero.style.setProperty("--px", `${e.clientX - r.left}px`);
      hero.style.setProperty("--py", `${e.clientY - r.top}px`);
      hero.classList.add(styles.lit); // turn the cursor light on
      start();
    };
    const onLeave = () => {
      target.x = 0; // glide back to center
      target.y = 0;
      hero.classList.remove(styles.lit);
      start();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* ── Stickers ──
     Clicking empty background adds a sticker at that spot, then removes it
     after its fade-out animation (2.6s). Clicks on links/buttons are ignored. */
  const dropSticker = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = e.currentTarget.getBoundingClientRect();
    const sticker: Sticker = {
      id: nextId.current++,
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      kind: Math.random() < 0.6 ? "flower" : "star",
      color: STICKER_COLORS[Math.floor(Math.random() * STICKER_COLORS.length)],
      rot: Math.round(Math.random() * 60 - 30),
    };
    setStickers((s) => [...s.slice(-11), sticker]); // keep at most 12 on screen
    window.setTimeout(() => setStickers((s) => s.filter((x) => x.id !== sticker.id)), 2600);
  };

  return (
    <section className={styles.hero} id="hero" ref={heroRef} onClick={dropSticker}>
      {/* ── 1. Risograph background ── */}
      <div className={styles.bg} aria-hidden="true">
        {/* Each blob has two wrappers: the outer one handles mouse parallax,
            the inner one handles the slow drifting animation. */}
        <div className={styles.inks}>
          <div className={`${styles.blobWrap} ${styles.depth1}`}><span className={`${styles.blob} ${styles.blobBlue}`} /></div>
          <div className={`${styles.blobWrap} ${styles.depth2}`}><span className={`${styles.blob} ${styles.blobPink}`} /></div>
          <div className={`${styles.blobWrap} ${styles.depth3}`}><span className={`${styles.blob} ${styles.blobSage}`} /></div>
          <div className={`${styles.blobWrap} ${styles.depth2}`}><span className={`${styles.blob} ${styles.blobButter}`} /></div>
          <div className={`${styles.blobWrap} ${styles.depth3}`}><span className={`${styles.blob} ${styles.blobOrange}`} /></div>
          <div className={`${styles.blobWrap} ${styles.depth1}`}><span className={`${styles.blob} ${styles.blobSky}`} /></div>
        </div>
        <div className={styles.light} />  {/* 3. cursor light */}
        <div className={styles.grain} />  {/* printed speckle texture */}
        <div className={styles.veil} />   {/* cream wash so the text stays readable */}
      </div>

      {/* ── 4. Stickers ── */}
      <div className={styles.stickers} aria-hidden="true">
        {stickers.map((s) => (
          <span
            key={s.id}
            className={styles.sticker}
            style={{ left: s.x, top: s.y, color: s.color, ["--rot" as string]: `${s.rot}deg` }}
          >
            {s.kind === "flower" ? <FlowerIcon /> : <StarIcon />}
          </span>
        ))}
      </div>

      <div className={styles.inner}>
        <h1 className={styles.srOnly}>Amy Lee</h1>

        {/* ── 2. 3D paper collage ── */}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.tilt}>
            {/* back layer: riso-printed paper shapes (were photos before) */}
            <div className={`${styles.paper} ${styles.square}`} />
            <div className={`${styles.paper} ${styles.clover}`} />

            {/* shadow: a blurred copy of the name that slides opposite the mouse */}
            <img src={nameCutout} className={styles.nameShadow} alt="" draggable={false} />

            {/* the name itself */}
            <img src={nameCutout} className={styles.nameCutout} alt="" draggable={false} />

            {/* front layer: sparkles that float the most */}
            <StarIcon className={`${styles.sparkle} ${styles.sparkle1}`} />
            <StarIcon className={`${styles.sparkle} ${styles.sparkle2}`} />
            <StarIcon className={`${styles.sparkle} ${styles.sparkle3}`} />
          </div>
        </div>

        {/* ── Text ── */}
        <div className={styles.text}>
          <TypingText className={styles.kicker} text="Welcome to my digital portfolio" />
          <p className={styles.blurb}>
            Hi! I’m Amy, a data science student at the University of Michigan who enjoys blending data analysis,
            software development, and visual design. With a background in fine arts, I love exploring creative ways to
            build data-driven, meaningful, and intuitive tech experiences.
          </p>

          <div className={styles.ctaRow}>
            <Link className={styles.primaryBtn} to="/projects">
              View projects
            </Link>
            <Link className={styles.secondaryBtn} to="/design">
              View design
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const TypingText: React.FC<{ text: string; className?: string; speed?: number; delay?: number }> = ({
  text,
  className,
  speed = 180,   // ms per letter — lower = faster typing
  delay = 600,  // ms to wait before typing starts
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // "reduce motion" users just see the full text
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let timer = window.setTimeout(function type() {
      setCount((c) => {
        if (c + 1 < text.length) timer = window.setTimeout(type, speed);
        return c + 1;
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, speed, delay]);

    return (
    // screen readers get the whole sentence at once instead of letter by letter
    <p className={className} aria-label={text}>
      {/* the letters typed so far */}
      <span aria-hidden="true">{text.slice(0, count)}</span>

      {/* once everything is typed, the cursor blinks twice more and then disappears */}
      <span
        className={count >= text.length ? `${styles.caret} ${styles.caretDone}` : styles.caret}
        aria-hidden="true"
      />

      {/* letters not typed yet (invisible, just holding their space) */}
      <span className={styles.untyped} aria-hidden="true">{text.slice(count)}</span>
    </p>
  );
};

/* stickers + sparkles */
const FlowerIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" width="100%" height="100%">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="20" cy="10" rx="7" ry="9.5" fill="currentColor" transform={`rotate(${a} 20 20)`} />
    ))}
    <circle cx="20" cy="20" r="5" fill="#fbf3d6" />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 40 40" className={className} width="100%" height="100%">
    <path d="M20 2 C21.5 14 26 18.5 38 20 C26 21.5 21.5 26 20 38 C18.5 26 14 21.5 2 20 C14 18.5 18.5 14 20 2Z" fill="currentColor" />
  </svg>
);

export default Hero;
