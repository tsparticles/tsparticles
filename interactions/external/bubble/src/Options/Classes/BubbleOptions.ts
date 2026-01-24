import type { BubbleMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type BubbleOptions = InteractivityOptions & {
  interactivity?: {
    modes: BubbleMode;
  };
};
