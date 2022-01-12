import type { ICoordinates } from "./ICoordinates";
import type { RotateDirection } from "../../Enums";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    direction: RotateDirection;
    radius: number;
    center: ICoordinates;
}
