import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Silver Stroke",
  background: "#000000",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#EEEEFF",
          "#CCCCDD",
          "#AAAACC",
          "#8888BB",
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
          "#EEEEFF",
          "#CCCCDD",
          "#AAAACC",
          "#555577",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
