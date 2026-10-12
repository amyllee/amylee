import React, { useEffect, useState } from "react";
import styles from "./VisitorTicket.module.css";
import { fetchTotalVisitors } from "../../lib/analytics";

/** serial number effect: 1284 → 001284 */
const serial = (n: number) => String(n).padStart(6, "0");

/** today's date in format: 12 OCT 26 */
const stampDate = () => {
  const d = new Date();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return `${String(d.getDate()).padStart(2, "0")} ${month} ${String(d.getFullYear()).slice(-2)}`;
};

type State = { status: "loading" } | { status: "ok"; count: number } | { status: "error" };

const VisitorTicket: React.FC = () => {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    fetchTotalVisitors().then((n) => {
      if (!alive) return;
      setState(n === null ? { status: "error" } : { status: "ok", count: n });
    });
    return () => {
      alive = false;
    };
  }, []);

  // The number line changes depending on whether the count loaded.
  // If it can't load (setting off, ad-blocker), the ticket still works as a little welcome.
  let number: React.ReactNode;
  let label: string;
  if (state.status === "ok") {
    const s = serial(state.count);
    number = (
      <span className={`${styles.number} ${styles.numberIn}`} data-ink={`No. ${s}`}>
        No. {s}
      </span>
    );
    label = `Visitor counter: ${state.count.toLocaleString()} visitors so far`;
  } else if (state.status === "loading") {
    number = (
      <span className={`${styles.number} ${styles.numberLoading}`} data-ink="No. ······">
        No. ······
      </span>
    );
    label = "Visitor counter loading";
  } else {
    number = (
      <span className={`${styles.number} ${styles.numberWelcome}`} data-ink="welcome!">
        welcome!
      </span>
    );
    label = "Admission ticket: welcome to the site";
  }

  return (
    <div className={styles.wrap} role="img" aria-label={label}>
      <div className={styles.ticket}>
        <div className={styles.main}>
          <div className={styles.topRow}>
            <span>Admit one</span>
            <span aria-hidden="true">✦</span>
          </div>
          <p className={styles.caption}>{state.status === "error" ? "thanks for stopping by" : "you are visitor"}</p>
          {number}
          <div className={styles.bottomRow}>
            <span>amy lee · portfolio</span>
            <span>{stampDate()}</span>
          </div>
        </div>

        <div className={styles.stub} aria-hidden="true">
          <span className={styles.stubText}>Keep this stub</span>
          <span className={styles.stubStar}>★</span>
        </div>
      </div>
    </div>
  );
};

export default VisitorTicket;
