import type { ICoordinates, Particle, Vector3d } from "@tsparticles/engine";
import type { EulerMass } from "./EulerMass";

export type RibbonParticle = Particle & {
    oscillationDistance?: number;
    oscillationSpeed?: number;
    prevPosition?: Vector3d;

    ribbonDrag?: number;
    ribbonLength?: number;
    ribbonOffset?: ICoordinates;
    ribbonStepDistance?: number;
    ribbonSteps?: EulerMass[];

    time?: number;
    velocityInherit?: number;
    ySpeed?: number;
};
