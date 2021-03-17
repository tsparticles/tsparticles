import type { DestroyType, StartValueType } from "../../../../Enums/Types";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface IOpacityAnimation extends IAnimation {
    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min: number;

    destroy: DestroyType | keyof typeof DestroyType;
    minimumValue: number;
    startValue: StartValueType | keyof typeof StartValueType;
}
