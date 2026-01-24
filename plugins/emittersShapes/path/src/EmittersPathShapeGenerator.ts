import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersPathShape } from "./EmittersPathShape.js";
import { EmittersPathShapeOptions } from "./Options/Classes/EmittersPathShapeOptions.js";
import type { IEmittersPathShapeOptions } from "./Options/Interfaces/IEmittersPathShapeOptions.js";

export class EmittersPathShapeGenerator implements IEmitterShapeGenerator<IEmittersPathShapeOptions> {
  generate(position: ICoordinates, size: IDimension, fill: boolean, options: IEmittersPathShapeOptions): IEmitterShape {
    const shapeOptions = new EmittersPathShapeOptions();

    shapeOptions.load(options);

    return new EmittersPathShape(position, size, fill, shapeOptions);
  }
}
