import type { RangeValue, SingleOrMultiple } from "@tsparticles/engine";

/** Firework options interface */
export interface IFireworkOptions {
  /** Background color */
  background: string;
  /** Brightness offset for stroke colors */
  brightness: RangeValue;
  /** OKLCH chroma offset for split stroke colors */
  chroma: RangeValue;
  /** Firework colors */
  colors: SingleOrMultiple<string>;
  /** Gravity acceleration */
  gravity: RangeValue;
  /** Minimum height before splitting the rocket */
  minHeight: RangeValue;
  /** Firework launch rate */
  rate: RangeValue;
  /** Enables explosion sounds */
  sounds: boolean;
  /** Rocket speed */
  speed: RangeValue;
  /** Number of split particles per explosion */
  splitCount: RangeValue;
}
