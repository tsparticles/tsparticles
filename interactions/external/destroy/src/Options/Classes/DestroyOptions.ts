import type { DestroyMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type DestroyOptions = InteractivityOptions & {
  interactivity?: {
    modes: DestroyMode;
  };
};
