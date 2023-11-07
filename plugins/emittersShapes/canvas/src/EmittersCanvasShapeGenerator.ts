import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersCanvasShape } from "./EmittersCanvasShape.js";

export class EmittersCanvasShapeGenerator implements IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>): IEmitterShape {
        return new EmittersCanvasShape(position, size, fill, options);
    }
}
