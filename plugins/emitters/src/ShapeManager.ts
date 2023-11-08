import type { Engine } from "@tsparticles/engine";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

const shapeGeneratorss: Map<string, IEmitterShapeGenerator> = new Map<string, IEmitterShapeGenerator>();

export class ShapeManager {
    private readonly _engine;

    constructor(engine: Engine) {
        this._engine = engine;
    }

    addShapeGenerator(name: string, generator: IEmitterShapeGenerator): void {
        if (!this.getShapeGenerator(name)) {
            shapeGeneratorss.set(name, generator);
        }
    }

    getShapeGenerator(name: string): IEmitterShapeGenerator | undefined {
        return shapeGeneratorss.get(name);
    }

    getSupportedShapeGenerators(): IterableIterator<string> {
        return shapeGeneratorss.keys();
    }
}
