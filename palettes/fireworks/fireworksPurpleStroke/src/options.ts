import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Purple Stroke",
  background: "#060011",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#EEDDFF",
          "#CC99FF",
          "#AA55FF",
          "#7700FF",
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
          "#EEDDFF",
          "#CC99FF",
          "#AA55FF",
          "#440088",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
