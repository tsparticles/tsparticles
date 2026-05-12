import type { IAnimatable, IAnimation, IOptionsColor, IValueWithRandom, RangeValue } from "@tsparticles/engine";

/**
 * [[include:Options/Particles/Orbit.md]]
 */
export interface IOrbit extends IAnimatable<IAnimation> {
  /** The orbit color */
  color?: string | IOptionsColor;

  /**
   * Enables/disables the animation
   */
  enable: boolean;

  /** The orbit opacity */
  opacity: RangeValue;
  /** The orbit radius */
  radius?: RangeValue;
  /** The orbit rotation */
  rotation: IValueWithRandom;
  /** The orbit width */
  width: RangeValue;
}
