import { type ICoordinates, type IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersCanvasShape } from "./EmittersCanvasShape.js";
import { EmittersCanvasShapeOptions } from "./Options/Classes/EmittersCanvasShapeOptions.js";
import type { IEmittersCanvasShapeOptions } from "./Options/Interfaces/IEmittersCanvasShapeOptions.js";

export class EmittersCanvasShapeGenerator implements IEmitterShapeGenerator<IEmittersCanvasShapeOptions> {
  generate(
    position: ICoordinates,
    size: IDimension,
    fill: boolean,
    options: IEmittersCanvasShapeOptions,
  ): IEmitterShape {
    const shapeOptions = new EmittersCanvasShapeOptions();

    shapeOptions.load(options);

    return new EmittersCanvasShape(position, size, fill, shapeOptions);
  }
}
