import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesNumberLimit } from "../../../Interfaces/Particles/Number/IParticlesNumberLimit.js";
import { LimitMode } from "../../../../Enums/Modes/LimitMode.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

export class ParticlesNumberLimit implements IParticlesNumberLimit, IOptionLoader<IParticlesNumberLimit> {
    mode: LimitMode | keyof typeof LimitMode;
    value: number;

    constructor() {
        this.mode = LimitMode.delete;
        this.value = 0;
    }

    load(data?: RecursivePartial<IParticlesNumberLimit>): void {
        if (!data) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
