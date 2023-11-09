import type { ICoordinates, IDimension } from "@tsparticles/engine";

export interface IEmitterShape {
    init(): Promise<void>;

    randomPosition(): Promise<ICoordinates | null>;

    resize(position: ICoordinates, size: IDimension): void;
}
