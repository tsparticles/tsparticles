import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import type { IDimension } from "../../Core/Interfaces/IDimension";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates;
}
