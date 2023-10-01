import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IRangedAnimation } from "../../IAnimation";
import { EasingType } from "../../../../Utils/EasingFunctions";

/**
 */
export interface IOpacityAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
    easing: EasingType;

    /**
     * @deprecated use the new minimumValue instead
     */
    opacity_min?: number;
}
