import type { EasingType, EasingTypeAlt } from "../../../../Enums/Types/EasingType";
import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IRangedAnimation } from "../../IAnimation";

/**
 */
export interface ISizeAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
    easing: EasingType | EasingTypeAlt;

    /**
     * @deprecated use the new minimumValue instead
     */
    size_min?: number;
}
