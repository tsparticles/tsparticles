import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IEmitterShapeReplace } from "../Interfaces/IEmitterShapeReplace.js";

export class EmitterShapeReplace implements IEmitterShapeReplace, IOptionLoader<IEmitterShapeReplace> {
    color: boolean;
    opacity: boolean;

    constructor() {
        this.color = false;
        this.opacity = false;
    }

    load(data?: RecursivePartial<IEmitterShapeReplace> | undefined): void {
        if (isNull(data)) {
            return;
        }

        if (data.color !== undefined) {
            this.color = data.color;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
