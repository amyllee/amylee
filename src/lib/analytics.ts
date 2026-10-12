/**
 * GoatCounter helpers.
 *
 * count.js is loaded in index.html with automatic counting turned off,
 * because the site uses #/ links (HashRouter). Instead, App.tsx calls
 * `trackPageview()` every time the page changes, so the GoatCounter
 * dashboard lists Home, Projects, Design and About separately.
 *
 * Visits from localhost (npm run dev / preview) are ignored by GoatCounter,
 * so testing locally won't inflate your numbers.
 */

export const GOATCOUNTER_CODE = "amyllee";

type GoatCounter = {
  count?: (vars: { path?: string; title?: string }) => void;
  no_onload?: boolean;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/** Count one pageview, waiting (briefly) for count.js to finish loading. */
export function trackPageview(path: string) {
  let tries = 0;
  const attempt = () => {
    const gc = window.goatcounter;
    if (gc && typeof gc.count === "function") {
      gc.count({ path });
      return;
    }
    // count.js loads async; give it ~10s, then give up quietly
    // (e.g. if an ad-blocker blocks it).
    if (++tries < 50) window.setTimeout(attempt, 200);
  };
  attempt();
}

/**
 * Total visitors for the whole site, or null if it can't be loaded.
 * Needs "Allow adding visitor counts on your website" turned on in
 * GoatCounter → Settings. GoatCounter caches this number for up to 4 hours.
 */
export async function fetchTotalVisitors(): Promise<number | null> {
  try {
    const res = await fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`);
    if (!res.ok) return null;
    const data: { count?: string } = await res.json();
    const n = parseInt(String(data.count ?? "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}