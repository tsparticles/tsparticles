import type { BubbleMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Bubble interaction options */
export type BubbleOptions = InteractivityOptions & {
  interactivity?: {
    modes: BubbleMode;
  };
};
