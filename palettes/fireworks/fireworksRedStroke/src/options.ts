import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Red Stroke",
  background: "#110000",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#FFDDCC",
          "#FF9966",
          "#FF4422",
          "#CC1100",
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
          "#FFDDCC",
          "#FF9966",
          "#FF4422",
          "#880000",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
