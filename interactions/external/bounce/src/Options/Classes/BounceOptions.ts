import type { Bounce } from "./Bounce.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Bounce interaction options */
export type BounceOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      bounce?: Bounce;
    };
  };
};
