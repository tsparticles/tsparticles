import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersCircleShape } from "./EmittersCircleShape.js";

export class EmittersCircleShapeGenerator implements IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>): IEmitterShape {
        return new EmittersCircleShape(position, size, fill, options);
    }
}
