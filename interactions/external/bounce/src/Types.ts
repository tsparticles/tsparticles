import type { Bounce } from "./Options/Classes/Bounce.js";
import type { BounceOptions } from "./Options/Classes/BounceOptions.js";
import type { IBounce } from "./Options/Interfaces/IBounce.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

/** Bounce mode interface */
export interface IBounceMode {
  /** Bounce options */
  bounce: IBounce;
}

/** Bounce mode options */
export interface BounceMode {
  /** Bounce options, undefined if not set */
  bounce?: Bounce;
}

/** Bounce container interface */
export type BounceContainer = InteractivityContainer & {
  actualOptions: BounceOptions;
  retina: {
    /** Bounce mode distance in pixels */
    bounceModeDistance?: number;
  };
};
