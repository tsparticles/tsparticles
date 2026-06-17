import type { Grab } from "./Grab.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Grab interaction options */
export type GrabOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      grab?: Grab;
    };
  };
};
