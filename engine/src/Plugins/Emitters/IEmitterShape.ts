import type { ICoordinates } from "../../Core/Interfaces";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, offset: ICoordinates, fill: boolean): ICoordinates;
}
