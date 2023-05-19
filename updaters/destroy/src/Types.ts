import type { IBounds, IParticlesOptions, Particle, ParticlesOptions } from "tsparticles-engine";
import type { Destroy } from "./Options/Classes/Destroy";
import type { IDestroy } from "./Options/Interfaces/IDestroy";

export type IDestroyParticlesOptions = IParticlesOptions & {
    destroy?: IDestroy;
};

export type DestroyParticlesOptions = ParticlesOptions & {
    destroy?: Destroy;
};

export type DestroyParticle = Particle & {
    destroyBounds?: Partial<IBounds>;
    options: DestroyParticlesOptions;
    /**
     * Sets the count of particles created when destroyed with split mode
     */
    splitCount?: number;
};
