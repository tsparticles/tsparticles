import type { IInteractivityParticleOptions } from "./Options/Interfaces/IInteractivityParticleOptions.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { InteractivityParticleOptions } from "./Options/Classes/InteractivityParticleOptions.js";
import type { InteractivityParticleOptionsData } from "./Options/Classes/InteractivityParticleOptionsData.js";

export interface IParticleMode {
  particle: IInteractivityParticleOptions;
}

export interface ParticleMode {
  particle?: InteractivityParticleOptions;
}

export type InteractivityParticleContainer = InteractivityContainer & {
  actualOptions: InteractivityParticleOptionsData;
};
