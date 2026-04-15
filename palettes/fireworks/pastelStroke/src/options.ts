import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Pastel Stroke",
  background: "#1a1a2e",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFD1DC",
          "#FFE4B5",
          "#FFFACD",
          "#B5EAD7",
          "#B5C8FF",
          "#E8B5FF",
          "#FFFFFF",
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
          "#FFD1DC",
          "#B5EAD7",
          "#B5C8FF",
          "#FFFFFF",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
