import type { ICoordinates, IDimension } from "@tsparticles/engine";

export interface IEmitterShape {
    randomPosition(): ICoordinates | null;

    resize(position: ICoordinates, size: IDimension): void;
}
