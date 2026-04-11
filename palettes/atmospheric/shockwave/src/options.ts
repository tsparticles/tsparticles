import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Shockwave",
  background: "#000000",
  blendMode: "screen",
  colors: [
    {
      fill: {
        enable: true,
        opacity: 0.75,
        value: ["#FFFFFF", "#FFEECC", "#FFAA44", "#FF5500"],
      },
    },
    {
      stroke: {
        value: ["#FFFFFF", "#FFEECC"],
        width: {
          min: 0.8,
          max: 1.8,
        },
      },
    },
    {
      fill: {
        enable: true,
        opacity: 0.6,
        value: ["#FFEECC", "#FFAA44", "#FF5500", "#AA2200"],
      },
      stroke: {
        value: ["#FFAA44", "#FF5500", "#AA2200"],
        width: {
          min: 2,
          max: 4,
        },
      },
    },
  ],
};
