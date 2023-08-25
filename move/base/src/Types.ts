import type { IParticleGravity } from "./IParticleGravity.js";
import type { IParticleSpin } from "./IParticleSpin.js";
import type { Particle } from "@tsparticles/engine";

export type MoveParticle = Particle & {
    /**
     * Gets particle gravity options
     */
    gravity?: IParticleGravity;

    /**
     */
    retina: {
        /**
         */
        spinAcceleration?: number;
    };

    /**
     */
    spin?: IParticleSpin;
};
