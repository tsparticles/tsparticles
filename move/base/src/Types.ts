import type { IParticleGravity } from "./IParticleGravity";
import type { IParticleSpin } from "./IParticleSpin";
import type { Particle } from "tsparticles-engine";

export type MoveParticle = Particle & {
    /**
     * Gets particle gravity options
     */
    gravity?: IParticleGravity;

    retina: {
        spinAcceleration?: number;
    };

    spin?: IParticleSpin;
};
