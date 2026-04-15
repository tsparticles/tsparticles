import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Rainbow Stroke",
  background: "#000000",
  blendMode: "lighter",
  colors: [
    {
      stroke: {
        value: [
          "#FF0000",
          "#FF8800",
          "#FFFF00",
          "#00FF00",
          "#00FFFF",
          "#0000FF",
          "#FF00FF",
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
          "#FF4400",
          "#FFCC00",
          "#00CC44",
          "#0088FF",
          "#CC00FF",
        ],
        width: {
          min: 1.4,
          max: 3.5,
        },
      },
    },
  ],
};
