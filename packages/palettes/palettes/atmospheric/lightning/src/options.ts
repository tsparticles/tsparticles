import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Lightning",
  background: "#000005",
  blendMode: "lighter",
  colors: [
    {
      fill: {
        enable: true,
        value: [
          "#FFFFFF",
          "#EEEEFF",
          "#AACCFF",
          "#6699FF",
          "#0033CC",
          "#AA88FF",
        ],
      },
    },
    {
      stroke: {
        value: ["#FFFFFF", "#EEEEFF"],
        width: {
          min: 0.6,
          max: 1.4,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: [
          "#FFFFFF",
          "#EEEEFF",
          "#AACCFF",
          "#6699FF",
          "#0033CC",
          "#AA88FF",
        ],
      },
      stroke: {
        value: ["#6699FF", "#3366FF", "#0033CC", "#AA88FF"],
        width: {
          min: 1.8,
          max: 3.2,
        },
      },
    },
  ],
};
