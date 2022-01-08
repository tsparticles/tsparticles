import type { Vector } from "../Utils";
import type { ICoordinates } from "./ICoordinates";

export interface ICircleBouncer {
    position: ICoordinates;
    velocity: Vector;
    radius: number;
    mass: number;
    factor: Vector;
}
