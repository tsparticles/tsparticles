import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape, IEmitterShapeGenerator } from "@tsparticles/plugin-emitters";
import { EmittersPolygonShape } from "./EmittersPolygonShape.js";

export class EmittersPolygonShapeGenerator implements IEmitterShapeGenerator {
    generate(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>): IEmitterShape {
        return new EmittersPolygonShape(position, size, fill, options);
    }
}
