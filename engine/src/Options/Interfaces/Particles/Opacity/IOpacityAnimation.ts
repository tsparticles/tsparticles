import type { DestroyType, StartValueType } from "../../../../Enums";
import type { IAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface IOpacityAnimation extends IAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
    startValue: StartValueType | keyof typeof StartValueType;
}
