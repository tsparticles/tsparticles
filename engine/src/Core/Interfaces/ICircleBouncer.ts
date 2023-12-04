import type { ICoordinates } from "./ICoordinates.js";
import type { Vector } from "../Utils/Vector.js";

export interface ICircleBouncer {
    factor: Vector;
    mass: number;
    position: ICoordinates;
    radius: number;
    velocity: Vector;
}
