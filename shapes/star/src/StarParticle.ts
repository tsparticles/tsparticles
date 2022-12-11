import type { Particle } from "tsparticles-engine";

export type StarParticle = Particle & {
    starInset?: number;
};
