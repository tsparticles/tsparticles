import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IRandomPositionData } from "./IRandomPositionData.js";

export interface IEmitterShape {
    init(): Promise<void>;

    randomPosition(): Promise<IRandomPositionData | null>;

    resize(position: ICoordinates, size: IDimension): void;
}
