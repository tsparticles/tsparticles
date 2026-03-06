import type { IOptionsColor, RangeValue } from "@tsparticles/engine";

/**
 */
export interface ITwinkleLinksValues {
  color?: string | IOptionsColor;
  enable: boolean;
  frequency: number;
  opacity: RangeValue;
}
