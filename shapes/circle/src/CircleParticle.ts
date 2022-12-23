import type { IRangeValue, Particle } from "tsparticles-engine";

export type CircleParticle = Particle & {
    circleRange?: IRangeValue;
};
