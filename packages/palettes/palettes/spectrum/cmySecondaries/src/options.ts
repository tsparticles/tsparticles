import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "CMY Secondaries",
  background: "#000000",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#00ffff",
        "#ff00ff",
        "#ffff00",
      ],
    },
  },
};
