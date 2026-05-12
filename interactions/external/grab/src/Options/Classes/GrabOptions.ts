import type { GrabMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Grab interaction options */
export type GrabOptions = InteractivityOptions & {
  interactivity?: {
    modes: GrabMode;
  };
};
