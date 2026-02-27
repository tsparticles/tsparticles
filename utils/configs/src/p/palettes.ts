import type { IPalette } from "../IPalette.js";
import type { ISourceOptions } from "@tsparticles/engine";
import { palettes } from "../palettes.js";

const getPaletteOptions = (key: string, palette: IPalette): ISourceOptions => ({
  key: `palette-${key}`,
  name: `Palette ${palette.name}`,
  particles: {
    number: {
      value: 200,
    },
    color: {
      value: palette.colors,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 10,
        max: 15,
      },
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  background: {
    color: palette.background,
  },
  blend: {
    enable: true,
    mode: palette.blendMode,
  },
});

export default Object.entries(palettes).map(([k, value]) => getPaletteOptions(k, value)) satisfies ISourceOptions[];
