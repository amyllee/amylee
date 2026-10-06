// Frame wall on Design page
import frame1 from "../assets/frames/frame1.png";
import frame2 from "../assets/frames/frame2.png";
import frame3 from "../assets/frames/frame3.png";
import frame4 from "../assets/frames/frame4.png";
import frame5 from "../assets/frames/frame5.png";

export type Frame = {
  image: string;
  caption: string;
  slot: 1 | 2 | 3 | 4 | 5;
};

export const FRAMES: Frame[] = [
  { image: frame1, caption: "Interned at PNC!", slot: 1 },
  { image: frame2, caption: "Friends", slot: 2 },
  { image: frame3, caption: "UM Football", slot: 3 },
  { image: frame4, caption: "love baking", slot: 4 },
  { image: frame5, caption: "Picklesburgh 2026", slot: 5 },
];
