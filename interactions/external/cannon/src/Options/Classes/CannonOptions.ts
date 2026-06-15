import type { Cannon } from "./Cannon.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Cannon interaction options */
export type CannonOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      cannon?: Cannon;
    };
  };
};
