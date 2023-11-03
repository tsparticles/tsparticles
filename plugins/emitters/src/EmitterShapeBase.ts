import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";

export abstract class EmitterShapeBase implements IEmitterShape {
    fill: boolean;
    options: Record<string, unknown>;
    position: ICoordinates;
    size: IDimension;

    protected constructor(position: ICoordinates, size: IDimension, fill: boolean, options: Record<string, unknown>) {
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.options = options;
    }

    resize(position: ICoordinates, size: IDimension): void {
        this.position = position;
        this.size = size;
    }

    abstract randomPosition(): ICoordinates | null;
}
