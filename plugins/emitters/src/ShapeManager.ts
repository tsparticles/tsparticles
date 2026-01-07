import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

const shapeGeneratorss: Map<string, IEmitterShapeGenerator> = new Map<string, IEmitterShapeGenerator>();

export class ShapeManager {
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
