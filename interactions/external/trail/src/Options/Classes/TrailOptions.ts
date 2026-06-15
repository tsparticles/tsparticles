import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Trail } from "./Trail.js";

export type TrailOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      trail?: Trail;
    };
  };
};
