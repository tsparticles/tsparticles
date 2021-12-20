import type { IPath } from "../../../../Interfaces/Particles/Move/Path/iPath";
import type { RecursivePartial, PathOptions, RangeValue } from "../../../../../Types";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import { deepExtend, setRangeValue } from "../../../../../Utils";

/**
 * @category Options
 */
export class Path implements IPath, IOptionLoader<IPath> {
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

    load(data?: RecursivePartial<IPath>): void {
        if (data === undefined) {
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

        if (data.options) {
            this.options = deepExtend(this.options, data.options) as PathOptions;
        }
    }
}
