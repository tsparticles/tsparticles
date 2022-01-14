import { DestroyType, StartValueType } from "../../../../Enums";
import { AnimationOptions } from "../../AnimationOptions";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class OpacityAnimation extends AnimationOptions implements IOpacityAnimation, IOptionLoader<IOpacityAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();
        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 2;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    load(data?: RecursivePartial<IOpacityAnimation>): void {
        if (!data) {
            return;
        }

        super.load(data);

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
