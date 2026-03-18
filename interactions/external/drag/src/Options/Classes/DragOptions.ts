import type { DragMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type DragOptions = InteractivityOptions & {
  interactivity?: {
    modes: DragMode;
  };
};
