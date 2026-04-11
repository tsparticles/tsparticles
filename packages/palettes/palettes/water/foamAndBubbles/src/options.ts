import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Foam & Bubbles",
  background: "#0a1f3c",
  blendMode: "source-over",
  colors: [
    {
      fill: {
        enable: true,
        opacity: 0.7,
        value: [
          "#FFFFFF",
          "#F0F8FF",
          "#EAF8FF",
          "#D0EEFF",
          "#C8F0FF",
        ],
      },
    },
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
      fill: {
        enable: true,
        opacity: 0.55,
        value: [
          "#D0EEFF",
          "#C8F0FF",
          "#A0D0FF",
          "#70AAFF",
        ],
      },
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
