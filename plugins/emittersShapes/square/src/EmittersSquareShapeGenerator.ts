import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersSquareShape } from "./EmittersSquareShape.js";

export class EmittersSquareShapeGenerator implements IEmitterShapeGenerator {
  generate(position: ICoordinates, size: IDimension, fill: boolean, options: unknown): IEmitterShape {
    return new EmittersSquareShape(position, size, fill, options);
  }
}
