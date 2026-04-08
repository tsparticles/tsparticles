import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Prism Scatter",
  background: "#020202",
  blendMode: "screen",
  colors: [
    {
      fill: {
        enable: true,
        value: [
          "#FF0022",
          "#FF6600",
          "#FFEE00",
          "#00FF44",
          "#00AAFF",
          "#0000FF",
          "#8800FF",
        ],
      },
      stroke: {
        value: ["#FFFFFF", "#F3F8FF"],
        width: {
          min: 0.6,
          max: 1.2,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: [
          "#FF0022",
          "#FF6600",
          "#FFEE00",
          "#00FF44",
          "#00AAFF",
          "#0000FF",
          "#8800FF",
        ],
      },
      stroke: {
        value: ["#00C8FF", "#0000FF", "#8800FF", "#FF0022"],
        width: {
          min: 1.4,
          max: 2.8,
        },
      },
    },
  ],
};
