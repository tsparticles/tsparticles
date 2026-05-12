import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { ParallaxMode } from "../../Types.js";

/** Parallax interaction options */
export type ParallaxOptions = InteractivityOptions & {
  interactivity?: {
    modes: ParallaxMode;
  };
};
