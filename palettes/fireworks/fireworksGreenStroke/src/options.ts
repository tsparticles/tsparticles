import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Green Stroke",
  background: "#001100",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#CCFFDD",
          "#88FFAA",
          "#33FF66",
          "#00CC33",
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
          "#CCFFDD",
          "#88FFAA",
          "#33FF66",
          "#007722",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
