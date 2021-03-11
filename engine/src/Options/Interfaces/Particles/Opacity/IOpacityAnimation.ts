import { DestroyType, StartValueType } from "../../../../Enums/Types";
import { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface IOpacityAnimation extends IAnimation {
    /**
     * @deprecated use the new Range syntax
     */
    opacity_min?: number;

    /**
     * @deprecated use the new Range syntax
     */
    minimumValue?: number;

    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
