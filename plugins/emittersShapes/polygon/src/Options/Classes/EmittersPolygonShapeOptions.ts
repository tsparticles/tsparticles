import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { IEmittersPolygonShapeOptions } from "../Interfaces/IEmittersPolygonShapeOptions.js";

export class EmittersPolygonShapeOptions
    implements IEmittersPolygonShapeOptions, IOptionLoader<IEmittersPolygonShapeOptions>
{
    angle: number;
    sides: number;

    constructor() {
        this.angle = 0;
        this.sides = 5;
    }

    load(data?: RecursivePartial<IEmittersPolygonShapeOptions> | undefined): void {
        if (!data) {
            return;
        }

        if (data.angle !== undefined) {
            this.angle = data.angle;
        }

        if (data.sides !== undefined) {
            this.sides = data.sides;
        }
    }
}
