/**
 * @category Options
 */
import type { IMovePath, IOptionLoader } from "../../../Interfaces";
import type { PathOptions, RangeValue, RecursivePartial } from "../../../../Types";
import { deepExtend, setRangeValue } from "../../../../Utils";

export class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    clamp;
    delay: RangeValue;
    enable;
    options: PathOptions;
    generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = 0;
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

        if (data.delay !== undefined) {
            this.delay = setRangeValue(data.delay);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.generator = data.generator;
        this.options = deepExtend(this.options, data.options) as PathOptions;
    }
}
