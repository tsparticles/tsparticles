import type { IOptionsColor } from "@tsparticles/engine";

/** Links shadow options */
export interface ILinksShadow {
  /** Shadow blur radius */
  blur: number;
  /** Shadow color */
  color: string | IOptionsColor;
  /** Enables link shadow */
  enable: boolean;
}
