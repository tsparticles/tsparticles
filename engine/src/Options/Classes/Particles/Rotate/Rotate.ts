import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import { RotateDirection, RotateDirectionAlt } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ValueWithRandom } from "../../ValueWithRandom";
import { AnimationOptions } from "../../AnimationOptions";
import { IAnimatable } from "../../../Interfaces/IAnimatable";

/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */
export class Rotate extends ValueWithRandom implements IAnimatable<AnimationOptions>, IRotate, IOptionLoader<IRotate> {
    public animation;
    public direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
    public path;

    constructor() {
        super();
        this.animation = new AnimationOptions();
        this.animation.speed = 0;
        this.direction = RotateDirection.clockwise;
        this.path = false;
        this.value = {
            min: 0,
            max: 360,
        };
    }

    public load(data?: RecursivePartial<IRotate>): void {
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
