import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/site/logo.png";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/design", label: "Design" },
  { to: "/about", label: "About Me" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo} aria-label="Home">
        <img src={logo} alt="Amy Lee logo" />
      </Link>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={open ? styles.barsOpen : styles.bars} />
      </button>

      <ul className={`${styles.navLinks} ${open ? styles.navLinksOpen : ""}`}>
        {LINKS.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
