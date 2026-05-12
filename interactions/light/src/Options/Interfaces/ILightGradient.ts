import type { IOptionsColor } from "@tsparticles/engine";

/** Light gradient options */
export interface ILightGradient {
  /** The start color of the gradient */
  start: string | IOptionsColor;
  /** The stop color of the gradient */
  stop: string | IOptionsColor;
}
