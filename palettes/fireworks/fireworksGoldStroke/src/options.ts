import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Gold Stroke",
  background: "#000000",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#FFEECC",
          "#FFCC44",
          "#FFAA00",
          "#FF6600",
        ],
        width: {
          min: 0.6,
          max: 1.8,
        },
      },
    },
    {
      stroke: {
        value: ["#FFEECC", "#FFCC44", "#FFAA00", "#FF6600", "#AA2200"],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
