import type { Destroy } from "./Destroy.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

/** Destroy interaction options */
export type DestroyOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      destroy?: Destroy;
    };
  };
};
