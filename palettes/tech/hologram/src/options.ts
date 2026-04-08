import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Hologram",
  background: "#000a0d",
  blendMode: "screen",
  colors: [
    {
      fill: {
        enable: true,
        value: [
          "#003844",
          "#007A8A",
          "#00C6C7",
          "#68EEFF",
          "#8F76FF",
          "#D89CFF",
        ],
      },
      stroke: {
        value: ["#AAFFFF", "#C8FAFF", "#8CEBFF"],
        width: {
          min: 0.6,
          max: 1.4,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: [
          "#003844",
          "#007A8A",
          "#00C6C7",
          "#68EEFF",
          "#8F76FF",
          "#D89CFF",
        ],
      },
      stroke: {
        value: ["#00F0FF", "#8F76FF", "#FFFFFF"],
        width: {
          min: 1.6,
          max: 3.2,
        },
      },
    },
  ],
};
