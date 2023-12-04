import type { ICoordinates, IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { IEmittersPathShapeOptions } from "../Interfaces/IEmittersPathShapeOptions.js";

export class EmittersPathShapeOptions implements IEmittersPathShapeOptions, IOptionLoader<IEmittersPathShapeOptions> {
    points: ICoordinates[];

    constructor() {
        this.points = [];
    }

    load(data?: RecursivePartial<IEmittersPathShapeOptions> | undefined): void {
        if (!data) {
            return;
        }

        if (data.points !== undefined) {
            this.points = data.points.map((t) => ({ x: t.x ?? 50, y: t.y ?? 50 }));
        }
    }
}
