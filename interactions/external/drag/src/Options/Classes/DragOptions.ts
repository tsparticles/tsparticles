import type { Drag } from "./Drag.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Drag interaction options */
export type DragOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      drag?: Drag;
    };
  };
};
