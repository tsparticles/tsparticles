import type { DestroyType, StartValueType } from "../../../../Enums";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface ISizeAnimation extends IAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    size_min?: number;

    /**
     * @deprecated use the new min/max object in the size value
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
