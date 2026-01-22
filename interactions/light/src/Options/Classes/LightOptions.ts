import type { InteractivityOptions, InteractivityParticlesOptions } from "@tsparticles/plugin-interactivity";
import type { LightMode } from "../../Types.js";

export type LightOptions = InteractivityOptions & {
  interactivity?: {
    modes: LightMode;
  };
};

export type LightParticlesOptions = InteractivityParticlesOptions & {
  interactivity?: {
    modes: LightMode;
  };
};
