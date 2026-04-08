import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Shockwave",
  background: "#000000",
  blendMode: "screen",
  colors: {
    stroke: [
      {
        value: ["#FFFFFF", "#FFEECC"],
        width: {
          min: 0.8,
          max: 1.8,
        },
      },
      {
        value: ["#FFAA44", "#FF5500", "#AA2200"],
        width: {
          min: 2,
          max: 4,
        },
      },
    ],
  },
};
