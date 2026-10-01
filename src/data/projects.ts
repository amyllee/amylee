// ─────────────────────────────────────────────────────────────
// PROJECTS — add a new project by copying one { ... } block.
// Put its image in src/assets/projects/ and import it below.
// ─────────────────────────────────────────────────────────────
import flights from "../assets/projects/flights.png";
import btaa from "../assets/projects/btaa.jpg";
import diabetes from "../assets/projects/diabetes.png";
import zetapi from "../assets/projects/zetapi.png";
import personalWebsite from "../assets/projects/personalWebsite.png";
import feedme from "../assets/projects/feedme.png";
import recommender from "../assets/projects/recommender.png";

export type Project = {
  title: string;
  image: string;
  description: string;
  category: "Data Science & ML" | "SWE" | "Web Dev";
  bullets?: string[];
  tech?: string[];
  links?: { label: string; url: string }[];
};

export const FEATURED_PROJECT = {
  title: "Music Analysis + Recommender System",
  blurb:
    "My current project is a Python and Power BI dashboard exploring what drives song popularity on Spotify, featuring a K-Nearest Neighbors recommendation engine built on 90K+ tracks. Five interactive pages let users explore artists, genres, and song similarity.",
};

export const PROJECTS: Project[] = [
  {
    title: "Flight Price Predictor",
    image: flights,
    description:
      "ML project predicting flight prices. Uses a Random Forest Regressor to predict fares from user inputs.",
    category: "Data Science & ML",
    bullets: [
      "Trained Random Forest models (full + simplified) for comparison.",
      "Built an interactive Streamlit flow for user inputs + evaluation visuals.",
    ],
    tech: ["Python", "Random Forest", "Streamlit", "Jupyter Notebook"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee/Flight_Predictor" }],
  },
  {
    title: "FeedMe",
    image: feedme,
    description:
      "A full-stack mobile app built with a team at MHacks to reduce food waste and encourage community cooking — I coordinated design, frontend, and backend across a cross-functional team.",
    category: "SWE",
    bullets: [
      "Built dynamic recipe generation using the MealDB API and implemented real-time inventory tracking with Supabase database integration to improve usability and support personalized cooking goals.",
    ],
    tech: ["React", "Supabase", "TypeScript", "Node.js"],
    links: [{ label: "DevPost", url: "https://devpost.com/software/feedme-gxs0n8" }],
  },
  {
    title: "Music Analysis + Recommender System",
    image: recommender,
    description:
      "ML project predicting flight prices. Uses a Random Forest Regressor to predict fares from user inputs.",
    category: "Data Science & ML",
    bullets: [
      "Python & Power BI Analysis for what drives song popularity.",
      "Built interactive dashboards using underlying KNN model for recommendation.",
    ],
    tech: ["Python", "Power BI"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee/music-recommender" }],
  },
  {
    title: "BTAA Data Visualization",
    image: btaa,
    description:
      "A data visualization of the top 20 most visited national parks for the Big Ten Academic Alliance contest (chosen to represent UMich).",
    category: "Data Science & ML",
    bullets: [
      "Built a clear narrative around visitation trends and ranking comparisons.",
      "Designed for poster-style readability and competition judging.",
    ],
    tech: ["Tableau", "Adobe Illustrator"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee" }],
  },
  {
    title: "Diabetes Health Risk Predictor",
    image: diabetes,
    description:
      "Predicts diabetes risk from health factors using a Decision Tree Classifier, with Matplotlib visualizations.",
    category: "Data Science & ML",
    bullets: [
      "Trained and evaluated a decision tree model for interpretability.",
      "Visualized decision boundaries/feature contributions to explain results.",
    ],
    tech: ["Python", "scikit-learn", "Matplotlib"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee/Diabetes-Risk-Predictor" }],
  },
  {
    title: "Zeta Pi Website",
    image: zetapi,
    description: "Redesigned and developed the Zeta Pi homepage for the new recruitment season.",
    category: "Web Dev",
    bullets: [
      "Designed a modern layout aligned with the organization's visual identity.",
      "Implemented responsive UI improvements and cleaner navigation.",
    ],
    tech: ["React", "CSS Modules", "Vite"],
    links: [{ label: "Website", url: "https://zetapi.tech/" }],
  },
  {
    title: "Personal Website",
    image: personalWebsite,
    description:
      "Designed and developed my personal React-based website to display projects and design work.",
    category: "Web Dev",
    bullets: [
      "Split the site into Home / Projects / Design / About pages with shared navigation.",
      "Built a Pinterest-style design gallery that loads new work straight from image folders.",
    ],
    tech: ["React", "React Router", "Vite", "CSS Modules"],
    links: [{ label: "GitHub", url: "https://github.com/amyllee" }],
  },
];
