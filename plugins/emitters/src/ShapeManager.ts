import type { Engine } from "tsparticles-engine";
import type { IEmitterShape } from "./IEmitterShape";

const shapes: Map<string, IEmitterShape> = new Map<string, IEmitterShape>();

export class ShapeManager {
    private readonly _engine;

    constructor(engine: Engine) {
        this._engine = engine;
    }

    addShape(name: string, drawer: IEmitterShape): void {
        if (!this.getShape(name)) {
            shapes.set(name, drawer);
        }
    }

    getShape(name: string): IEmitterShape | undefined {
        return shapes.get(name);
    }

    getSupportedShapes(): IterableIterator<string> {
        return shapes.keys();
    }
}
