import type { ConnectMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Connect interaction options */
export type ConnectOptions = InteractivityOptions & {
  interactivity?: {
    modes: ConnectMode;
  };
};
