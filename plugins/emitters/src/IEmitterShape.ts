import type { ICoordinates, IDimension } from "tsparticles-engine";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates;
}
