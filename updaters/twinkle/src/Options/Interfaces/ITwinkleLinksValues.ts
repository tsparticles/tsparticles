import type { IOptionsColor, RangeValue } from "@tsparticles/engine";

/** The twinkle links values options */
export interface ITwinkleLinksValues {
  /** The twinkle links color */
  color?: string | IOptionsColor;
  /** Enables the twinkle links */
  enable: boolean;
  /** The twinkle links frequency */
  frequency: number;
  /** The twinkle links opacity */
  opacity: RangeValue;
}
