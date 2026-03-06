import type {
  IOptionsColor,
  IParticlesOptions,
  IRangeHsl,
  IValueWithRandom,
  RecursivePartial,
  SingleOrMultiple,
} from "@tsparticles/engine";

export interface ISplit {
  count: number;
  factor: IValueWithRandom;
  fillColor?: string | IOptionsColor;
  fillColorOffset?: Partial<IRangeHsl>;
  particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
  rate: IValueWithRandom;
  sizeOffset: boolean;
  strokeColor?: string | IOptionsColor;
  strokeColorOffset?: Partial<IRangeHsl>;
}
