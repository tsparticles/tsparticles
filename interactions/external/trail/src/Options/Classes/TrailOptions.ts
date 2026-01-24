import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { TrailMode } from "../../Types.js";

export type TrailOptions = InteractivityOptions & {
  interactivity?: {
    modes: TrailMode;
  };
};
