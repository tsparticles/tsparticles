import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";

export interface IEmitterShapeGenerator<TOptions = unknown> {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: TOptions): IEmitterShape;
}
