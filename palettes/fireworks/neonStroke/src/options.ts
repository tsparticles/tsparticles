import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Neon Stroke",
  background: "#000000",
  blendMode: "lighter",
  colors: [
    {
      stroke: {
        value: [
          "#FF0088",
          "#FF4400",
          "#FFFF00",
          "#00FF44",
          "#00FFFF",
          "#0088FF",
          "#FF00FF",
          "#AAFF00",
        ],
        width: {
          min: 0.6,
          max: 2,
        },
      },
    },
    {
      stroke: {
        value: [
          "#FF0088",
          "#FFFF00",
          "#00FFFF",
          "#0088FF",
          "#FF00FF",
        ],
        width: {
          min: 1.4,
          max: 3.5,
        },
      },
    },
  ],
};
