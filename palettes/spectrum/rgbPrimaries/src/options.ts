import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "RGB Primaries",
  background: "#000000",
  blendMode: "lighter",
  colors: {
    fill: {
      enable: true,
      value: [
        "#ff0000",
        "#00ff00",
        "#0000ff",
      ],
    },
  },
};
