import type { ICoordinates } from "./ICoordinates";
import type { Vector } from "../Utils/Vector";

export interface ICircleBouncer {
    factor: Vector;
    mass: number;
    position: ICoordinates;
    radius: number;
    velocity: Vector;
}
