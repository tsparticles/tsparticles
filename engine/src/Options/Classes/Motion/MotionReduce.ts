import type { IMotionReduce } from "../../Interfaces/Motion/IMotionReduce";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class MotionReduce implements IMotionReduce, IOptionLoader<IMotionReduce> {
    /**
     * Factor used to reduce motion, the higher the value, the higher the motion reduction
     */
    factor;

    /**
     * Reduces motion settings for users with `prefer-reduced-motion` enabled
     */
    value;

    constructor() {
        this.factor = 4;
        this.value = true;
    }

    load(data?: RecursivePartial<IMotionReduce>): void {
        if (!data) {
            return;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
