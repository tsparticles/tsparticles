import type { RotateDirection } from "../../Enums/Directions";
import { ICoordinates } from "./ICoordinates";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    direction: RotateDirection;
    radius: number;
    center: ICoordinates;
}
