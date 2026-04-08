import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Ice Stroke",
  background: "#010a14",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#E8F8FF",
          "#AADDFF",
          "#66BBFF",
          "#2299FF",
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
          "#E8F8FF",
          "#AADDFF",
          "#66BBFF",
          "#0055CC",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
