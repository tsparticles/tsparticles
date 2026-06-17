import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Repulse } from "./Repulse.js";

export type RepulseOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      repulse?: Repulse;
    };
  };
};
