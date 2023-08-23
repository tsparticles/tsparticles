import type { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IRangedAnimation } from "../../IAnimation";

/**
 */
export interface IOpacityAnimation extends IRangedAnimation {
    destroy: DestroyType | keyof typeof DestroyType;
}
