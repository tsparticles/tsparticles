import type { InteractivityOptions, InteractivityParticlesOptions } from "@tsparticles/plugin-interactivity";
import type { LightMode } from "../../Types.js";

/** Light interaction options */
export type LightOptions = InteractivityOptions & {
  interactivity?: {
    modes: LightMode;
  };
};

/** Light particle options */
export type LightParticlesOptions = InteractivityParticlesOptions & {
  interactivity?: {
    modes: LightMode;
  };
};
