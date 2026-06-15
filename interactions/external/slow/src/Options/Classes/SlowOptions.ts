import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Slow } from "./Slow.js";

export type SlowOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      slow?: Slow;
    };
  };
};
