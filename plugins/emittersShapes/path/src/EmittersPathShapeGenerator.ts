import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersPathShape } from "./EmittersPathShape.js";

export class EmittersPathShapeGenerator implements IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>): IEmitterShape {
        return new EmittersPathShape(position, size, fill, options);
    }
}
