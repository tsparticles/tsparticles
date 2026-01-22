import type { AttractMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type AttractOptions = InteractivityOptions & {
  interactivity?: {
    modes: AttractMode;
  };
};
