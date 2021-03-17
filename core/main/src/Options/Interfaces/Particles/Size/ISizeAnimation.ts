import type { DestroyType, StartValueType } from "../../../../Enums";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface ISizeAnimation extends IAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    size_min: number;

    destroy: DestroyType | keyof typeof DestroyType;
    minimumValue: number;
    startValue: StartValueType | keyof typeof StartValueType;
}
