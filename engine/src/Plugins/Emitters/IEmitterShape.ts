import type { ICoordinates, IDimension } from "../../Core";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates;
}
