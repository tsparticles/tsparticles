import type { DestroyType, StartValueType } from "../../../../Enums";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface IOpacityAnimation extends IAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min?: number;

    /**
     * @deprecated use the new min/max object in opacity value
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
