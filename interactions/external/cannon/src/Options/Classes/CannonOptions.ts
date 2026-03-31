import type { CannonMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type CannonOptions = InteractivityOptions & {
  interactivity?: {
    modes: CannonMode;
  };
};
