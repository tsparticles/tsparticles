import type { ICoordinates, IDimension } from "@tsparticles/engine";

export interface IEmitterShape {
    init(options: Record<string, unknown>): void;

    randomPosition(position: ICoordinates, size: IDimension, fill: boolean): ICoordinates | null;
}
