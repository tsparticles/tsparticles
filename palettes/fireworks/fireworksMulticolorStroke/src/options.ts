import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Multicolor Stroke",
  background: "#000000",
  blendMode: "lighter",
  colors: [
    {
      stroke: {
        value: [
          "#FF0000",
          "#FF4400",
          "#FFCC00",
          "#00FF44",
          "#00FFFF",
          "#0088FF",
          "#AA00FF",
          "#FF00AA",
          "#FFFFFF",
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
          "#FF0000",
          "#FFCC00",
          "#00FF44",
          "#00FFFF",
          "#AA00FF",
          "#FFFFFF",
        ],
        width: {
          min: 1.3,
          max: 3,
        },
      },
    },
  ],
};
