import type { Particle } from "@tsparticles/engine";

export type SpiralParticle = Particle & {
    spiralInnerRadius?: number;
    spiralLineSpacing?: number;
    spiralWidthFactor?: number;
};
