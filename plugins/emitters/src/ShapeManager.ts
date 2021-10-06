import type { IEmitterShape } from "./IEmitterShape";

const shapes: Map<string, IEmitterShape> = new Map<string, IEmitterShape>();

export class ShapeManager {
    static addShape(name: string, drawer: IEmitterShape): void {
        if (!ShapeManager.getShape(name)) {
            shapes.set(name, drawer);
        }
    }

    static getShape(name: string): IEmitterShape | undefined {
        return shapes.get(name);
    }

    static getSupportedShapes(): IterableIterator<string> {
        return shapes.keys();
    }
}
