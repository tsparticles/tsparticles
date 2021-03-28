import type { ICoordinates } from "./ICoordinates";
import type { Vector } from "../Particle/Vector";

export interface ICircleBouncer {
    factor: Vector;
    mass: number;
    radius: number;
    position: ICoordinates;
    velocity: Vector;
}
