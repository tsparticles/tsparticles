import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";
import { EmitterShapeType } from "../../Enums/EmitterShapeType.js";
import type { IEmitterShape } from "../Interfaces/IEmitterShape.js";
import { deepExtend } from "@tsparticles/engine";

export class EmitterShape implements IEmitterShape, IOptionLoader<IEmitterShape> {
    options: Record<string, unknown>;
    type: EmitterShapeType | keyof typeof EmitterShapeType;

    constructor() {
        this.options = {};
        this.type = EmitterShapeType.square;
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
