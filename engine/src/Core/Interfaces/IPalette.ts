import type { RangeValue } from "../../Types/RangeValue.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

export interface IPaletteColorsFill {
  enable: boolean;
  value: SingleOrMultiple<string>;
}

export interface IPaletteColorsStroke {
  value: SingleOrMultiple<string>;
  width: RangeValue;
}

export interface IPaletteColors {
  fill?: IPaletteColorsFill;
  stroke?: SingleOrMultiple<IPaletteColorsStroke>;
}

export interface IPalette {
  background: string;
  blendMode: GlobalCompositeOperation;
  colors: IPaletteColors;
  name: string;
}
