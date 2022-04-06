import type { IMovePath } from "../../../../Interfaces/Particles/Move/Path/IMovePath";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import { MovePathDelay } from "./MovePathDelay";
import { PathOptions } from "../../../../../Types/PathOptions";
import { RecursivePartial } from "../../../../../Types/RecursivePartial";
import { deepExtend } from "../../../../../Utils/Utils";

/**
 * @category Options
 */
export class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp;
    delay;
    enable;
    options: PathOptions;
    generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = new MovePathDelay();
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
