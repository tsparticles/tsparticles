import { type IOptionLoader, type RecursivePartial, deepExtend, isNull } from "@tsparticles/engine";
import { EmitterShapeReplace } from "./EmitterShapeReplace.js";
import type { IEmitterShape } from "../Interfaces/IEmitterShape.js";

export class EmitterShape implements IEmitterShape, IOptionLoader<IEmitterShape> {
    options: Record<string, unknown>;
    replace;
    type: string;

    constructor() {
        this.options = {};
        this.replace = new EmitterShapeReplace();
        this.type = "square";
    }

    load(data?: RecursivePartial<IEmitterShape>): void {
        if (isNull(data)) {
            return;
        }

        if (data.options !== undefined) {
            this.options = deepExtend({}, data.options ?? {}) as Record<string, unknown>;
        }

        this.replace.load(data.replace);

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
