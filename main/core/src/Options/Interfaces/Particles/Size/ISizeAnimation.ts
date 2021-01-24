import type { DestroyType, StartValueType } from "../../../../Enums";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface ISizeAnimation extends IAnimation {
    /**
     * @deprecated use the new Range syntax
     */
    size_min?: number;

    /**
     * @deprecated use the new Range syntax
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
