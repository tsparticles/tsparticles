import type { CannonMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Cannon interaction options */
export type CannonOptions = InteractivityOptions & {
  interactivity?: {
    modes: CannonMode;
  };
};
