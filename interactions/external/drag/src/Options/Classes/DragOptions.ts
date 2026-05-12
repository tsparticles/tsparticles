import type { DragMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Drag interaction options */
export type DragOptions = InteractivityOptions & {
  interactivity?: {
    modes: DragMode;
  };
};
