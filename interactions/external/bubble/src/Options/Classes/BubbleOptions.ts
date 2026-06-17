import type { Bubble } from "./Bubble.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Bubble interaction options */
export type BubbleOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      bubble?: Bubble;
    };
  };
};
