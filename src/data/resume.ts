// EDUCATION × EXPERIENCE (home page)

export type ResumeEntry = {
  title: string;        // degree or role
  org: string;          // school or organization
  location?: string;
  dates: string;
  bullets?: string[];
};

export const EDUCATION: ResumeEntry[] = [
  {
    title: "B.S. in Data Science",
    org: "University of Michigan",
    location: "Ann Arbor, MI",
    dates: "Aug 2024 – May 2027",
    bullets: [
      "Relevant coursework: Data Structures & Algorithms, Database Management Systems, Intro to Machine Learning, Computer Vision, Applied Regression Analysis, Applied Linear Algebra"
    ],
  },
  {
    title: "M.S. in Applied Statistics",
    org: "University of Michigan",
    location: "Ann Arbor, MI",
    dates: "Aug 2026 – May 2028",
    // bullets: ["Relevant coursework: Probability and Distribution Theory"],
  },
];

export const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Technology Summer Intern — Data Analytics",
    org: "PNC Financial Services",
    location: "Pittsburgh, PA",
    dates: "Jun 2026 – Aug 2026",
    /*
    bullets: [
      "Automated fraud risk reporting across 7 enterprise systems, mapping relationships between siloed sources and transforming raw data into actionable insights; built 15+ DAX measures to cut time to surface key metrics by 45%",
      "Engaged 70+ stakeholders to refine dashboard functionality and ensure alignment with business requirements",
      "Built an AI-powered onboarding agent in Microsoft Copilot Studio, structuring internal training and documentation into a retrieval-ready knowledge base to reduce acclimation time for new hires across Fraud and Technology teams",
    ],
    */
  },
  {
    title: "Head of Marketing",
    org: "Zeta Pi — Professional Technology Fraternity",
    location: "Ann Arbor, MI",
    dates: "Jan 2026 – Present",
    /*
    bullets: [
      "Directed frontend development of the organization’s React-based website, collaborating with the technology committee to iteratively test layout and enhance site architecture",
      "Led a 12-member committee responsible for coordinating the deployment of 20 digital assets",
      "Hosted weekly club development events with 50+ attendees such as resume reviews and  bonding",
    ],
    */
  },
  {
    title: "Vice President",
    org: "Generation Asian Pacific American",
    location: "Ann Arbor, MI",
    dates: "April 2026 – Present",
    /*
    bullets: [
      "Directed organization and show logistics, including managing meeting operations for 15 board members, sending announcements, booking venues and spaces, handling communcation",
      "Led creative strategy and branding for a 1,000+ attendee cultural showcase, coordinating digital marketing using 50+ event materials across the school year, translating the show’s cultural theme for an impactful audience experience",
      "Expanded show attendance 18% since previous year through refreshed marketing visuals and brand identity"
    ],
    */
  },
  {
    title: "Design Team",
    org: "MHacks",
    location: "Ann Arbor, MI",
    dates: "Feb 2026 – Present",
  },
  {
    title: "Public Relations Director",
    org: "Seven Mile Music, Arts & Coding",
    location: "Detroit, MI",
    dates: "Sep 2025 – May 2026",
  },
];
