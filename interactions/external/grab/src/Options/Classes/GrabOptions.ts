import type { GrabMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type GrabOptions = InteractivityOptions & {
  interactivity?: {
    modes: GrabMode;
  };
};
