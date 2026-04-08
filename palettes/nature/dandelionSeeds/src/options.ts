import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Dandelion Seeds",
  background: "#0a0c08",
  blendMode: "source-over",
  colors: [
    {
      fill: {
        enable: true,
        value: ["#FFFFEE", "#EEEEDD", "#DDDDCC", "#FFFFAA", "#F9F8F3"],
      },
      stroke: {
        value: ["#FFFFFF", "#FFFFEE", "#F4F1E8"],
        width: {
          min: 0.3,
          max: 0.9,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: ["#FFFFEE", "#EEEEDD", "#DDDDCC", "#FFFFAA", "#F9F8F3"],
      },
      stroke: {
        value: ["#C6B58E", "#9F8A63"],
        width: {
          min: 1,
          max: 1.8,
        },
      },
    },
  ],
};
