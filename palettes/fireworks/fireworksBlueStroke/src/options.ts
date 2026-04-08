import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Blue Stroke",
  background: "#000011",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#CCDDFF",
          "#88AAFF",
          "#4477FF",
          "#1144DD",
        ],
        width: {
          min: 0.6,
          max: 1.8,
        },
      },
    },
    {
      stroke: {
        value: [
          "#CCDDFF",
          "#88AAFF",
          "#4477FF",
          "#002299",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
