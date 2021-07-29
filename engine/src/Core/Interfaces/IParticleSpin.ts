import type { RotateDirection } from "../../Enums";
import type { ICoordinates } from "./ICoordinates";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    direction: RotateDirection;
    radius: number;
    center: ICoordinates;
}
