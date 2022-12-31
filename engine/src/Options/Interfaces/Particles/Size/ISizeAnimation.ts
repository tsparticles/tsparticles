import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IRangedAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface ISizeAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
}
