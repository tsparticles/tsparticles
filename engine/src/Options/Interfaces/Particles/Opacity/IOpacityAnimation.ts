import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IAnimation } from "../../IAnimation";
import type { StartValueType } from "../../../../Enums/Types/StartValueType";

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
