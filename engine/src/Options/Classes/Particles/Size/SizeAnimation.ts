import { DestroyType, StartValueType } from "../../../../Enums";
import { AnimationOptions } from "../../AnimationOptions";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class SizeAnimation extends AnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;

    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();

        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 5;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    load(data?: RecursivePartial<ISizeAnimation>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
