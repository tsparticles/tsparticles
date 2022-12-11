import type { IOptionLoader, RecursivePartial, RotateDirectionAlt } from "tsparticles-engine";
import { RotateDirection, ValueWithRandom } from "tsparticles-engine";
import type { IRotate } from "../Interfaces/IRotate";
import { RotateAnimation } from "./RotateAnimation";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export class Rotate extends ValueWithRandom implements IRotate, IOptionLoader<IRotate> {
    animation;
    direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    path;

    constructor() {
        super();
        this.animation = new RotateAnimation();
        this.direction = RotateDirection.clockwise;
        this.path = false;
        this.value = 0;
    }

    load(data?: RecursivePartial<IRotate>): void {
        if (!data) {
            return;
        }

        super.load(data);

        if (data.direction !== undefined) {
            this.direction = data.direction;
        }

        this.animation.load(data.animation);

        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}
