import type { Particle } from "tsparticles-engine";

export type CogParticle = Particle & {
    cogHoleRadius?: number;
    cogInnerRadius?: number;
    cogInnerTaper?: number;
    cogNotches?: number;
    cogOuterTaper?: number;
};
