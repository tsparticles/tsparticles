import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Parallax } from "./Parallax.js";

/** Parallax interaction options */
export type ParallaxOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      parallax?: Parallax;
    };
  };
};
