import { DestroyType } from "../../../../Enums/Types/DestroyType";
import { EasingType } from "../../../../Enums/Types/EasingType";
import type { EasingTypeAlt } from "../../../../Enums/Types/EasingType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 */
export class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;
    easing: EasingType | EasingTypeAlt;

    constructor() {
        super();

        this.destroy = DestroyType.none;
        this.easing = EasingType.easeInCirc;
        this.speed = 5;
    }

    /**
     * @deprecated this property is obsolete, please use the new minimumValue
     * @returns the minimum size value
     */
    get size_min(): number | undefined {
        return this.minimumValue;
    }

    /**
     * @deprecated this property is obsolete, please use the new minimumValue
     * @param value -
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

        if (data.easing !== undefined) {
            this.easing = data.easing;
        }
    }
}
