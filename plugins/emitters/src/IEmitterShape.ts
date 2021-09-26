import type { ICoordinates } from "tsparticles-engine";

export interface IEmitterShape {
    randomPosition(position: ICoordinates, offset: ICoordinates, fill: boolean): ICoordinates;
}
