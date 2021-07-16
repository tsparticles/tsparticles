import type { Vector } from "../Particle/Vector";
import type { ICoordinates } from "./ICoordinates";
import type { IVelocity } from "./IVelocity";

export interface ICircleBouncer {
    position: ICoordinates;
    velocity: Vector;
    radius: number;
    mass: number;
    factor: Vector;
}
