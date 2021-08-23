import type { IParticle, Vector } from "tsparticles";

export type CurvesPathParticle = IParticle & {
    pathGen?: () => number;
    curveVelocity?: Vector;
};
