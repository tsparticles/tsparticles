import { AnimationOptions } from "../../AnimationOptions";
import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { StartValueType } from "../../../../Enums/Types/StartValueType";

/**
 * @category Options
 */
export class SizeAnimation extends AnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     */
    get size_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value
     */
    set size_min(value: number | undefined) {
        this.minimumValue = value;
    }

    destroy: DestroyType | keyof typeof DestroyType;

    /**
     * @deprecated this property is obsolete, please use the new min/max object in the size value
     */
    minimumValue?: number;

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

        this.minimumValue = data.minimumValue ?? data.size_min;

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
