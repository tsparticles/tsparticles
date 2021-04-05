import type { IPath } from "../../../../Interfaces/Particles/Move/Path/iPath";
import type { RecursivePartial } from "../../../../../Types";
import { PathDelay } from "./PathDelay";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Path implements IPath, IOptionLoader<IPath> {
    clamp;
    delay;
    enable;
    generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = new PathDelay();
        this.enable = false;
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
    }
}
