import type { ICoordinates, IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { IEmittersPathShapeOptions } from "../Interfaces/IEmittersPathShapeOptions.js";

const defaultPosition: ICoordinates = { x: 50, y: 50 };

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
            this.points = data.points.map(t => ({ x: t.x ?? defaultPosition.x, y: t.y ?? defaultPosition.y }));
        }
    }
}
