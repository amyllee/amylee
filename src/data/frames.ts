// ─────────────────────────────────────────────────────────────
// FRAME WALL — the hand-drawn frames at the top of the Design page.
// Each frame links to a section below ("collection" = the folder name in
// src/assets/design/), or opens one specific piece ("item" = the file name).
// "slot" is its position on the wall (1 = big top-left … 5 = tall right).
// ─────────────────────────────────────────────────────────────
import frame1 from "../assets/frames/frame1.png";
import frame2 from "../assets/frames/frame2.png";
import frame3 from "../assets/frames/frame3.png";
import frame4 from "../assets/frames/frame4.png";
import frame5 from "../assets/frames/frame5.png";

export type Frame = {
  image: string;
  label: string;
  collection: string;
  item?: string;
  slot: 1 | 2 | 3 | 4 | 5;
};

export const FRAMES: Frame[] = [
  { image: frame1, label: "Zeta Pi", collection: "01-zeta-pi", slot: 1 },
  { image: frame2, label: "Okemos Woof Pack", collection: "02-okemos-woof-pack", slot: 2 },
  { image: frame3, label: "Co-ex Postcard", collection: "03-selected-work", item: "02-coex-aquarium-postcard.jpg", slot: 3 },
  { image: frame4, label: "Solar Racing Logo", collection: "03-selected-work", item: "03-solar-racing-logo.png", slot: 4 },
  { image: frame5, label: "BTAA Data Viz", collection: "03-selected-work", item: "01-national-parks-poster.jpg", slot: 5 },
];
