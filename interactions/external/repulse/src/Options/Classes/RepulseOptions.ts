import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { RepulseMode } from "../../Types.js";

export type RepulseOptions = InteractivityOptions & {
  interactivity?: {
    modes: RepulseMode;
  };
};
