import type { Options } from "@tsparticles/engine";
import type { ParticleMode } from "../../Types.js";

/** Interactivity particle options data type */
export type InteractivityParticleOptionsData = Options & {
  interactivity?: {
    modes: ParticleMode;
  };
};
