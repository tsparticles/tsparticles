import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IRangedAnimation } from "../../IAnimation";

/**
 * @category Options
 */
export interface IOpacityAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;

    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min?: number;
}
