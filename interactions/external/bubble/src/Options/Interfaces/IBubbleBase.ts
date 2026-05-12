import type { IOptionsColor, SingleOrMultiple } from "@tsparticles/engine";

/** The bubble base mode options */
export interface IBubbleBase {
  /** The bubble base color */
  color?: SingleOrMultiple<string | IOptionsColor>;
  /** The bubble base distance */
  distance: number;
  /** The bubble base duration */
  duration: number;
  /** The bubble base mix */
  mix: boolean;
  /** The bubble base opacity */
  opacity?: number;
  /** The bubble base size */
  size?: number;
}
