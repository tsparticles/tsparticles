import type { IPalette } from "@tsparticles/engine";

export const palettes: Record<string, IPalette> = {
  test: {
    name: "Test",
    background: "#0d0d0d",
    blendMode: "lighter",
    colors: {
      fill: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
        enable: true,
      },
    },
  },
};
