import type { IParticleSpin } from "./IParticleSpin";
import type { Particle } from "tsparticles-engine";

export type SpinParticle = Particle & {
    spin?: IParticleSpin;
    retina: {
        spinAcceleration?: number;
    };
};
