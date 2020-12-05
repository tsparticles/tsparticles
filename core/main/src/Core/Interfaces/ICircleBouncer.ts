import type { ICoordinates } from "./ICoordinates";
import type { Velocity } from "../Particle/Velocity";

export interface ICircleBouncer {
    position: ICoordinates;
    velocity: Velocity;
    radius: number;
    factor: Velocity;
}
