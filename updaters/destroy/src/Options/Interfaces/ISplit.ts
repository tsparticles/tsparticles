import type {
  IOptionsColor,
  IParticlesOptions,
  IRangeHsl,
  IValueWithRandom,
  RecursivePartial,
  SingleOrMultiple,
} from "@tsparticles/engine";

/** The split options */
export interface ISplit {
  /** The split count */
  count: number;
  /** The split factor */
  factor: IValueWithRandom;
  /** The split fill color */
  fillColor?: string | IOptionsColor;
  /** The split fill color offset */
  fillColorOffset?: Partial<IRangeHsl>;
  /** The split particles options */
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  /** The split rate */
  rate: IValueWithRandom;
  /** The split size offset */
  sizeOffset: boolean;
  /** The split stroke color */
  strokeColor?: string | IOptionsColor;
  /** The split stroke color offset */
  strokeColorOffset?: Partial<IRangeHsl>;
}
