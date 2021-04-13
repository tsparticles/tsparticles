import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import { DestroyType, StartValueType } from "../../../../Enums";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { AnimationOptions } from "../../AnimationOptions";

/**
 * @category Options
 */
export class SizeAnimation extends AnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    /**
     * @deprecated use the new Range syntax
     */
    get size_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     * @deprecated use the new Range syntax
     */
    set size_min(value: number | undefined) {
        this.minimumValue = value;
    }

    /**
     * @deprecated use the new Range syntax
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;

    constructor() {
        super();
        this.count = 0;
        this.destroy = DestroyType.none;
        this.enable = false;
        this.speed = 5;
        this.startValue = StartValueType.random;
        this.sync = false;
    }

    load(data?: RecursivePartial<ISizeAnimation>): void {
        super.load(data);

        if (data === undefined) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }

        this.minimumValue = data.minimumValue ?? data.size_min;

        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
    }
}
