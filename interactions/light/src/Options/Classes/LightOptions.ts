import type { InteractivityOptions, InteractivityParticlesOptions } from "@tsparticles/plugin-interactivity";
import type { Light } from "./Light.js";

/** Light interaction options */
export type LightOptions = InteractivityOptions & {
  interactivity?: {
    modes: {
      light?: Light;
    };
  };
};

/** Light particle options */
export type LightParticlesOptions = InteractivityParticlesOptions & {
  interactivity?: {
    modes: {
      light?: Light;
    };
  };
};
