import type { Container } from "@tsparticles/engine";
import type { IInteractivityParticle } from "./Options/Interfaces/IInteractivityParticle.js";
import type { InteractivityParticle } from "./Options/Classes/InteractivityParticle.js";
import type { InteractivityParticleOptions } from "./Options/Classes/InteractivityParticleOptions.js";

export interface IParticleMode {
    particle: IInteractivityParticle;
}

export interface ParticleMode {
    particle?: InteractivityParticle;
}

export type InteractivityParticleContainer = Container & {
    actualOptions: InteractivityParticleOptions;
};
