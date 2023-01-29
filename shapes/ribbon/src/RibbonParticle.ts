import type { ICoordinates, Particle } from "@tsparticles/engine";
import type { EulerMass } from "./EulerMass";

export type RibbonParticle = Particle & {
    ribbonDrag?: number;
    ribbonLength?: number;
    ribbonOffset?: ICoordinates;
    ribbonStepDistance?: number;
    ribbonSteps?: EulerMass[];
};
