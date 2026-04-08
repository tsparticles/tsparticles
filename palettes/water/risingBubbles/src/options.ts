import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Rising Bubbles",
  background: "#011428",
  blendMode: "source-over",
  colors: [
    {
      stroke: {
        value: ["#FFFFFF", "#CCEEFF", "#E2F7FF"],
        width: {
          min: 0.4,
          max: 1.1,
        },
      },
    },
    {
      stroke: {
        value: ["#88CCEE", "#44AACC"],
        width: {
          min: 1.3,
          max: 2.7,
        },
      },
    },
  ],
};
