import type { PathOptions, RecursivePartial } from "../../../../../Types";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";
import type { IPath } from "../../../../Interfaces/Particles/Move/Path/IPath";
import { PathDelay } from "./PathDelay";
import { deepExtend } from "../../../../../Utils";

/**
 * @category Options
 */
export class Path implements IPath, IOptionLoader<IPath> {
    clamp;
    delay;
    enable;
    options: PathOptions;
    generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = new PathDelay();
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
