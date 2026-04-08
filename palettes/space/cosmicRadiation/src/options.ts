import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Cosmic Radiation",
  background: "#020204",
  blendMode: "screen",
  colors: [
    {
      fill: {
        enable: true,
        value: [
          "#FF4444",
          "#4444FF",
          "#44FF44",
          "#FFFF44",
          "#FF44FF",
          "#44FFFF",
          "#FFFFFF",
        ],
      },
      stroke: {
        value: ["#FF8888", "#8888FF", "#88FF88"],
        width: {
          min: 0.7,
          max: 1.6,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: [
          "#FF4444",
          "#4444FF",
          "#44FF44",
          "#FFFF44",
          "#FF44FF",
          "#44FFFF",
          "#FFFFFF",
        ],
      },
      stroke: {
        value: ["#FFFF88", "#FF88FF", "#88FFFF", "#FFFFFF"],
        width: {
          min: 1.8,
          max: 3.4,
        },
      },
    },
  ],
};
