import type { IRotateAnimation } from "../../../Interfaces/Particles/Rotate/IRotateAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
    public enable;
    public speed;
    public sync;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }

    public load(data?: RecursivePartial<IRotateAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
