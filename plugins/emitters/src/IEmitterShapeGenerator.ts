import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";

export interface IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>): IEmitterShape;
}
