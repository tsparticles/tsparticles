import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;

    constructor() {
        super();

        this.destroy = DestroyType.none;
        this.speed = 5;
    }

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

    load(data?: RecursivePartial<ISizeAnimation>): void {
        if (data?.size_min !== undefined && data.minimumValue === undefined) {
            data.minimumValue = data.size_min;
        }

        super.load(data);

        if (!data) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
