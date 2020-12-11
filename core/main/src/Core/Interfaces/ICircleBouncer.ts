import type { ICoordinates } from "./ICoordinates";
import type { Vector } from "../Particle/Vector";

export interface ICircleBouncer {
    position: ICoordinates;
    velocity: Vector;
    radius: number;
    factor: Vector;
}
