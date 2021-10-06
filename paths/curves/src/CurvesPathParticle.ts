import type { IParticle, Vector } from "tsparticles-engine";

export type CurvesPathParticle = IParticle & {
    pathGen?: () => number;
    curveVelocity?: Vector;
};
