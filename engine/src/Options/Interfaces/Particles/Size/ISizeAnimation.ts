import type { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IRangedAnimation } from "../../IAnimation.js";

/**
 */
export interface ISizeAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
}
