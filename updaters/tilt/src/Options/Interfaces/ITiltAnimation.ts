import type { RangeValue } from "@tsparticles/engine";

/** The tilt animation options */
export interface ITiltAnimation {
  /** The tilt animation decay */
  decay: RangeValue;
  /** Enables the tilt animation */
  enable: boolean;
  /** The tilt animation speed */
  speed: RangeValue;
  /** Enables the tilt animation sync */
  sync: boolean;
}
