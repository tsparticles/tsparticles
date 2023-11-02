import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import type { IEmitterShape } from "../Interfaces/IEmitterShape.js";
import { deepExtend } from "@tsparticles/engine";

export class EmitterShape implements IEmitterShape, IOptionLoader<IEmitterShape> {
    options: Record<string, unknown>;
    type: string;

    constructor() {
        this.options = {};
        this.type = "square";
    }

    load(data?: RecursivePartial<IEmitterShape> | undefined): void {
        if (!data) {
            return;
        }

        if (data.options !== undefined) {
            this.options = <Record<string, unknown>>deepExtend({}, data.options ?? {});
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
