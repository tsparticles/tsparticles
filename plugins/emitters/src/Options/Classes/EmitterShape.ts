import { type IOptionLoader, type RecursivePartial, deepExtend } from "@tsparticles/engine";
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

    load(data?: RecursivePartial<IEmitterShape> | undefined): void {
        if (!data) {
            return;
        }

        if (data.options !== undefined) {
            this.options = <Record<string, unknown>>deepExtend({}, data.options ?? {});
        }

        this.replace.load(data.replace);

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
