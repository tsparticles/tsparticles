import type { Engine } from "@tsparticles/engine";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

const shapes: Map<string, IEmitterShapeGenerator> = new Map<string, IEmitterShapeGenerator>();

export class ShapeManager {
    private readonly _engine;

    constructor(engine: Engine) {
        this._engine = engine;
    }

    addShapeGenerator(name: string, generator: IEmitterShapeGenerator): void {
        if (!this.getShapeGenerator(name)) {
            shapes.set(name, generator);
        }
    }

    getShapeGenerator(name: string): IEmitterShapeGenerator | undefined {
        return shapes.get(name);
    }

    getSupportedShapeGenerators(): IterableIterator<string> {
        return shapes.keys();
    }
}
