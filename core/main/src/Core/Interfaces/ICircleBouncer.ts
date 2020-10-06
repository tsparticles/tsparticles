import { ICoordinates } from "./ICoordinates";
import { IVelocity } from "./IVelocity";

export interface ICircleBouncer {
    position: ICoordinates;
    velocity: IVelocity;
    radius: number;
    factor: IVelocity;
}
