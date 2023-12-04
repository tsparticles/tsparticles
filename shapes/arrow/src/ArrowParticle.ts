import type { Particle } from "@tsparticles/engine";

export type ArrowParticle = Particle & {
    bodyHeightFactor?: number;
    headWidthFactor?: number;
    heightFactor?: number;
};
