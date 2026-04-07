import type { IPalette } from "@tsparticles/engine";

export const palettes: Record<string, IPalette> = {
  test: {
    name: "Test",
    background: "#000000",
    blendMode: "lighter",
    colors: ["#ff0000", "#00ff00", "#0000ff"],
    fill: true,
  },
};
