import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Foam & Bubbles",
  background: "#0a1f3c",
  blendMode: "source-over",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#F0F8FF",
          "#EAF8FF",
        ],
        width: {
          min: 0.4,
          max: 1,
        },
      },
    },
    {
      stroke: {
        value: [
          "#D0EEFF",
          "#C8F0FF",
          "#A0D0FF",
          "#70AAFF",
        ],
        width: {
          min: 1.2,
          max: 2.6,
        },
      },
    },
  ],
};
