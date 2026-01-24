import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

const shapeGenerators: Map<string, IEmitterShapeGenerator> = new Map<string, IEmitterShapeGenerator>();

export class ShapeManager {
  addShapeGenerator(name: string, generator: IEmitterShapeGenerator): void {
    if (!this.getShapeGenerator(name)) {
      shapeGenerators.set(name, generator);
    }
  }

  getShapeGenerator(name: string): IEmitterShapeGenerator | undefined {
    return shapeGenerators.get(name);
  }

  getSupportedShapeGenerators(): IterableIterator<string> {
    return shapeGenerators.keys();
  }
}
