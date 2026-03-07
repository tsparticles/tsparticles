import type { IPalette, ISourceOptions } from "@tsparticles/engine";
import { palettes } from "../palettes.js";

const getPaletteOptions = (key: string, palette: IPalette): ISourceOptions => ({
  key: `palette-${key}`,
  name: `Palette ${palette.name}`,
  particles: {
    number: {
      value: 200,
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
  palette: key,
});

export default Object.entries(palettes).map(([k, value]) => getPaletteOptions(k, value)) satisfies ISourceOptions[];
