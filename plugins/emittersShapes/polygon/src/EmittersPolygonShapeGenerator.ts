import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShape } from "./EmittersPolygonShape.js";
import { EmittersPolygonShapeOptions } from "./Options/Classes/EmittersPolygonShapeOptions.js";
import type { IEmittersPolygonShapeOptions } from "./Options/Interfaces/IEmittersPolygonShapeOptions.js";

export class EmittersPolygonShapeGenerator implements IEmitterShapeGenerator<IEmittersPolygonShapeOptions> {
  generate(
    position: ICoordinates,
    size: IDimension,
    fill: boolean,
    options: IEmittersPolygonShapeOptions,
  ): IEmitterShape {
    const shapeOptions = new EmittersPolygonShapeOptions();

    shapeOptions.load(options);

    return new EmittersPolygonShape(position, size, fill, shapeOptions);
  }
}
