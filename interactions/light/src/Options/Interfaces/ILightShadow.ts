import type { IOptionsColor } from "@tsparticles/engine";

/** Light shadow options */
export interface ILightShadow {
  /** The shadow color */
  color: string | IOptionsColor;
  /** The shadow length */
  length: number;
}
