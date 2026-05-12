import type { IInteractivityParticleOptions } from "./Options/Interfaces/IInteractivityParticleOptions.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { InteractivityParticleOptions } from "./Options/Classes/InteractivityParticleOptions.js";
import type { InteractivityParticleOptionsData } from "./Options/Classes/InteractivityParticleOptionsData.js";

/** Particle mode interface */
export interface IParticleMode {
  particle: IInteractivityParticleOptions;
}

/** Particle mode options */
export interface ParticleMode {
  particle?: InteractivityParticleOptions;
}

/** Interactivity particle container */
export type InteractivityParticleContainer = InteractivityContainer & {
  actualOptions: InteractivityParticleOptionsData;
};
