import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Fireworks - Copper Stroke",
  background: "#040100",
  blendMode: "screen",
  colors: [
    {
      stroke: {
        value: [
          "#FFFFFF",
          "#FFEECC",
          "#DDAA55",
          "#BB7722",
          "#883300",
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
          "#FFEECC",
          "#DDAA55",
          "#BB7722",
          "#551100",
        ],
        width: {
          min: 1.4,
          max: 3.2,
        },
      },
    },
  ],
};
