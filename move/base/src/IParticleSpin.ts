import type { ICoordinates, RotateDirection } from "tsparticles-engine";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    center: ICoordinates;
    direction: RotateDirection;
    radius: number;
}
