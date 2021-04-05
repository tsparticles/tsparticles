import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import { RotateAnimation } from "./RotateAnimation";
import { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";

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
        this.value = {
            min: 0,
            max: 360,
        };
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
