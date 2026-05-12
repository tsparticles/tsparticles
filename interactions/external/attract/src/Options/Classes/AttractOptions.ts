import type { AttractMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Attract interaction options */
export type AttractOptions = InteractivityOptions & {
  interactivity?: {
    modes: AttractMode;
  };
};
