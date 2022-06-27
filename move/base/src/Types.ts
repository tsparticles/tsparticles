import type { IParticleGravity } from "./IParticleGravity";
import type { IParticleSpin } from "./IParticleSpin";
import type { Particle } from "tsparticles-engine";

export type MoveParticle = Particle & {
    spin?: IParticleSpin;
    retina: {
        spinAcceleration?: number;
    };
    /**
     * Gets particle gravity options
     */
    gravity?: IParticleGravity;
};
