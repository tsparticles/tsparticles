import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { RotateDirection } from "../../Enums/Directions/RotateDirection";

export interface IParticleSpin {
    acceleration: number;
    angle: number;
    direction: RotateDirection;
    radius: number;
    center: ICoordinates;
}
