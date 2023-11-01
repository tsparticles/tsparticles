import type { ICoordinates, IDimension } from "@tsparticles/engine";

export interface IEmitterShape {
    randomPosition(
        position: ICoordinates,
        size: IDimension,
        fill: boolean,
        options?: Record<string, unknown>,
    ): ICoordinates;
}
