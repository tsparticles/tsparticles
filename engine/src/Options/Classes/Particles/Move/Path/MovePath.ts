import type { IMovePath } from "../../../../Interfaces/Particles/Move/IMovePath";
import type { RecursivePartial } from "../../../../../Types";
import { MovePathDelay } from "./MovePathDelay";
import type { IOptionLoader } from "../../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class MovePath implements IMovePath, IOptionLoader<IMovePath> {
    public clamp;
    public delay;
    public enable;
    public generator?: string;

    constructor() {
        this.clamp = true;
        this.delay = new MovePathDelay();
        this.enable = false;
    }

    public load(data?: RecursivePartial<IMovePath>): void {
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
