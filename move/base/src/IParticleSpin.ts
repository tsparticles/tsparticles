import type { ICoordinates, RotateDirection } from "tsparticles-engine";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    direction: RotateDirection;
    radius: number;
    center: ICoordinates;
}
