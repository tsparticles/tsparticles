import type { ICoordinates } from "../../Core";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, offset: ICoordinates, fill: boolean): ICoordinates;
}
