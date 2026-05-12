import type { RangeValue } from "../../Types/RangeValue.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/** Palette fill color configuration */
export interface IPaletteColorsFill {
  /** Enables or disables the fill color */
  enable: boolean;
  /** Fill color opacity range */
  opacity?: RangeValue;
  /** Fill color value, single or multiple */
  value: SingleOrMultiple<string>;
}

/** Palette stroke color configuration */
export interface IPaletteColorsStroke {
  /** Stroke color opacity range */
  opacity?: RangeValue;
  /** Stroke color value, single or multiple */
  value: SingleOrMultiple<string>;
  /** Stroke width range */
  width: RangeValue;
}

/** Palette colors with optional fill and stroke */
export interface IPaletteColors {
  /** Fill color configuration */
  fill?: IPaletteColorsFill;
  /** Stroke color configuration */
  stroke?: IPaletteColorsStroke;
}

/** Color palette definition */
export interface IPalette {
  /** Background color */
  background: string;
  /** Canvas blend mode */
  blendMode: GlobalCompositeOperation;
  /** Palette colors, single or multiple sets */
  colors: SingleOrMultiple<IPaletteColors>;
  /** Palette name */
  name: string;
}
