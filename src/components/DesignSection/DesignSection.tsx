import React, { useState } from "react";
import styles from "./DesignSection.module.css";
import designTitle from "../../assets/designTitle.png"

import frame1 from "../../assets/frame1.png";
import frame11 from "../../assets/frame11.png";
import frame12 from "../../assets/frame12.png";
import frame13 from "../../assets/frame13.png";
import frame14 from "../../assets/frame14.png";
import frame15 from "../../assets/frame15.png";
import frame16 from "../../assets/frame16.png";
import frame17 from "../../assets/frame17.png";

import frame2 from "../../assets/frame2.png";
import frame21 from "../../assets/frame21.png";
import frame22 from "../../assets/frame22.png";
import frame23 from "../../assets/frame23.png";
import frame24 from "../../assets/frame24.png";
import frame25 from "../../assets/frame25.png";
import frame26 from "../../assets/frame26.png";

import frame3 from "../../assets/frame3.png";
import frame4 from "../../assets/frame4.png";
import frame5 from "../../assets/frame5.png";

import Modal from "../Modal/Modal";
import modalStyles from "../Modal/Modal.module.css";

type DesignWork = {
  // what shows in the grid
  thumbnail: string;

  // what shows as the main image inside the modal (can be different)
  modalImage?: string;

  title: string;
  description: string;
  className: string;

  tools?: string[];
  gallery?: string[]; // extra images in modal
};

const designWorks: DesignWork[] = [
  {
    thumbnail: frame1,
    modalImage: frame1,
    title: "Zeta Pi",
    description:
      "Designed the Zeta Pi (Professional Technology Fraternity) rush T-shirt and promotional materials as the current Head of Marketing.",
    className: styles.item1,
    tools: ["Illustrator", "Canva", "Procreate"],
    gallery: [frame11, frame12, frame13, frame14, frame15, frame16, frame17],
  },
  {
    thumbnail: frame2,
    modalImage: frame2,
    title: "Okemos Woof Pack T-shirt",
    description:
      "Designed merchandise for Okemos Woof Pack, creating personalized portraits for each dog.",
    className: styles.item2,
    tools: ["Canva", "Procreate"],
    gallery: [frame21, frame22, frame23, frame24, frame25, frame26],
  },
  {
    thumbnail: frame3,
    modalImage: frame3,
    title: "Co-ex Postcard Design",
    description:
      "One of eight designs for a postcard series created during my study abroad at Yonsei International Summer School.",
    className: styles.item3,
    tools: ["Illustrator", "Photoshop"],
  },
  {
    thumbnail: frame4,
    modalImage: frame4,
    title: "Okemos Solar Racing Club Logo",
    description:
      "Created the Okemos Solar Racing Club logo, featured on the solar car and organization’s website.",
    className: styles.item4,
    tools: ["Illustrator", "Procreate"],
  },
  {
    thumbnail: frame5,
    modalImage: frame5,
    title: "BTAA Data Visualization",
    description:
      "Designed a poster visualizing the top 20 most visited National Parks for the BTAA Data Visualization Challenge. Selected to represent U-M as the student representative in the 2025 BTAA Data Visualization challenge.",
    className: styles.item5,
    tools: ["Tableau", "Illustrator"],
  },
];

const DesignSection: React.FC = () => {
  const [activeWork, setActiveWork] = useState<DesignWork | null>(null);

  const mainImage = activeWork ? activeWork.modalImage ?? activeWork.thumbnail : null;

  return (
    <section className={styles.design} id="design">
      <img
        src={designTitle}
        alt="Design Work"
        className={styles.sectionTitle}
      />

      <div className={styles.gallery}>
        {designWorks.map((work) => (
          <button
            key={work.title}
            type="button"
            className={`${styles.galleryItem} ${work.className}`}
            onClick={(e) => {
              e.currentTarget.blur();
              setActiveWork(work);
            }}
            aria-label={`Open design details for ${work.title}`}
          >
            <img src={work.thumbnail} alt={work.title} className={styles.designImg} />
            <div className={styles.hoverTag} aria-hidden="true">
              View
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={!!activeWork} title={activeWork?.title} onClose={() => setActiveWork(null)}>
        {activeWork ? (
          <div style={{ display: "grid", gap: "14px", textAlign: "left" }}>
            {/* Main image */}
            {mainImage ? (
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={mainImage}
                  alt={activeWork.title}
                  style={{ width: "100%", display: "block", height: "auto" }}
                />
              </div>
            ) : null}

            <p style={{ margin: 0, lineHeight: 1.65, opacity: 0.92 }}>
              {activeWork.description}
            </p>

            {activeWork.tools?.length ? (
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 650, marginBottom: "8px" }}>
                  Tools
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeWork.tools.map((t) => (
                    <span
                      key={t}
                      style={{
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: "999px",
                        padding: "6px 10px",
                        fontSize: "0.92rem",
                        background: "rgba(0,0,0,0.02)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {activeWork.gallery?.length ? (
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 650, marginBottom: "8px" }}>
                  More images
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {activeWork.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${activeWork.title} extra ${idx + 1}`}
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        <div style={{ height: "24px" }} />
      </Modal>
    </section>
  );
};

export default DesignSection;
