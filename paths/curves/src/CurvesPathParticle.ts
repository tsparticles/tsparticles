import type { Particle, Vector } from "@tsparticles/engine";

export type CurvesPathParticle = Particle & {
    curveVelocity?: Vector;
    pathGen?: () => number;
};
