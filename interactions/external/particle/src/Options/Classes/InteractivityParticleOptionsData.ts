import type { InteractivityParticleOptions } from "./InteractivityParticleOptions.js";
import type { Options } from "@tsparticles/engine";

/** Interactivity particle options data type */
export type InteractivityParticleOptionsData = Options & {
  interactivity?: {
    modes: {
      particle?: InteractivityParticleOptions;
    };
  };
};
