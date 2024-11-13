import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath.js";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader.js";
import type { PathOptions } from "../../../../../Types/PathOptions.js";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../../ValueWithRandom.js";
import { deepExtend } from "../../../../../Utils/Utils.js";
import { isNull } from "../../../../../Utils/TypeUtils.js";

/**
 */
export class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp;
    delay;
    enable;
    generator?: string;
    options: PathOptions;

    constructor() {
        this.clamp = true;
        this.delay = new ValueWithRandom();
        this.enable = false;
        this.options = {};
    }

    load(data?: RecursivePartial<IMovePath>): void {
        if (isNull(data)) {
            return;
        }

        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }

        this.delay.load(data.delay);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.generator = data.generator;

        if (data.options) {
            this.options = deepExtend(this.options, data.options) as PathOptions;
        }
    }
}
