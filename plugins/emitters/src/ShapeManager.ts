import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";

export class ShapeManager {
  readonly #shapeGenerators = new Map<string, IEmitterShapeGenerator>();
  addShapeGenerator(name: string, generator: IEmitterShapeGenerator): void {
    if (!this.getShapeGenerator(name)) {
      this.#shapeGenerators.set(name, generator);
    }
  }

  getShapeGenerator(name: string): IEmitterShapeGenerator | undefined {
    return this.#shapeGenerators.get(name);
  }

  getSupportedShapeGenerators(): IterableIterator<string> {
    return this.#shapeGenerators.keys();
  }
}
