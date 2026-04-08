import type { RangeValue } from "../../Types/RangeValue.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

export interface IPaletteColorsFill {
  enable: boolean;
  opacity?: RangeValue;
  value: SingleOrMultiple<string>;
}

export interface IPaletteColorsStroke {
  opacity?: RangeValue;
  value: SingleOrMultiple<string>;
  width: RangeValue;
}

export interface IPaletteColors {
  fill?: IPaletteColorsFill;
  stroke?: IPaletteColorsStroke;
}

export interface IPalette {
  background: string;
  blendMode: GlobalCompositeOperation;
  colors: SingleOrMultiple<IPaletteColors>;
  name: string;
}
