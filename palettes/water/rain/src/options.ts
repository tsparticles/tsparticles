import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Rain",
  background: "#0a0e14",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#AACCEE",
        "#88AACE",
        "#6688AA",
        "#4F6A89",
        "#354F6D",
      ],
    },
    stroke: [
      {
        value: [
          "#CCDDF0",
          "#D8E3EF",
          "#B8CCDF",
          "#AACCEE",
        ],
        width: {
          min: 0.5,
          max: 1.3,
        },
      },
      {
        value: [
          "#6688AA",
          "#4F6A89",
          "#445566",
        ],
        width: {
          min: 1.6,
          max: 2.8,
        },
      },
    ],
  },
};
