import type { RangeValue } from "@tsparticles/engine";

/**
 */

export interface ITiltAnimation {
  decay: RangeValue;
  enable: boolean;
  speed: RangeValue;
  sync: boolean;
}
