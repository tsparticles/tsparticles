import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IAnimation } from "../../IAnimation";
import type { StartValueType } from "../../../../Enums/Types/StartValueType";

/**
 * @category Options
 */
export interface ISizeAnimation extends IAnimation {
    destroy: DestroyType | keyof typeof DestroyType;

    /**
     * @deprecated use the new min/max object in the size value
     */
    minimumValue?: number;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min?: number;

    startValue: StartValueType | keyof typeof StartValueType;
}
