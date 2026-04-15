import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Oil Slick",
  background: "#0a0810",
  blendMode: "overlay",
  colors: [
    {
      fill: {
        enable: true,
        value: [
          "#220033",
          "#550055",
          "#006633",
          "#00AA66",
          "#AACC00",
          "#FF9900",
          "#CC0044",
        ],
      },
    },
    {
      stroke: {
        value: ["#55117A", "#1B8F7C", "#D2DA3D"],
        width: {
          min: 0.5,
          max: 1.2,
        },
      },
    },
    {
      fill: {
        enable: true,
        value: [
          "#220033",
          "#550055",
          "#006633",
          "#00AA66",
          "#AACC00",
          "#FF9900",
          "#CC0044",
        ],
      },
      stroke: {
        value: ["#FFB347", "#E64D97", "#7A5CFF"],
        width: {
          min: 1.6,
          max: 2.8,
        },
      },
    },
  ],
};
