import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { SlowMode } from "../../Types.js";

export type SlowOptions = InteractivityOptions & {
  interactivity?: {
    modes: SlowMode;
  };
};
