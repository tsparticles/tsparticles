import type { ICoordinates, IDimension } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";

export abstract class EmitterShapeBase<TOptions = unknown> implements IEmitterShape {
    fill: boolean;
    options: TOptions;
    position: ICoordinates;
    size: IDimension;

    protected constructor(position: ICoordinates, size: IDimension, fill: boolean, options: TOptions) {
        this.position = position;
        this.size = size;
        this.fill = fill;
        this.options = options;
    }

    resize(position: ICoordinates, size: IDimension): void {
        this.position = position;
        this.size = size;
    }

    abstract init(): Promise<void>;

    abstract randomPosition(): Promise<ICoordinates | null>;
}
