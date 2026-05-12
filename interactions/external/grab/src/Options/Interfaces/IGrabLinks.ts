import type { IOptionsColor } from "@tsparticles/engine";

/** The grab links options */
export interface IGrabLinks {
  /** The grab links blink animation */
  blink: boolean;
  /** The grab links color */
  color?: string | IOptionsColor;
  /** The grab links consent */
  consent: boolean;
  /** The grab links opacity */
  opacity: number;
}
