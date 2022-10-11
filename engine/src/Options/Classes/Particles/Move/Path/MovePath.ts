import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import type { PathOptions } from "../../../../../Types/PathOptions";
import type { RecursivePartial } from "../../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../../ValueWithRandom";
import { deepExtend } from "../../../../../Utils/Utils";

/**
 * @category Options
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
        if (!data) {
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
