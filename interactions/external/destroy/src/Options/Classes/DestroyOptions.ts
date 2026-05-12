import type { DestroyMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Destroy interaction options */
export type DestroyOptions = InteractivityOptions & {
  interactivity?: {
    modes: DestroyMode;
  };
};
