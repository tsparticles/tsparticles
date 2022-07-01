import type { IParticle, Vector } from "tsparticles-engine";

export type CurvesPathParticle = IParticle & {
    curveVelocity?: Vector;
    pathGen?: () => number;
};
