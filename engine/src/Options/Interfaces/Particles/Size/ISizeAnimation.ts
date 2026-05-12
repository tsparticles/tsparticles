import type { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IRangedAnimation } from "../../IAnimation.js";

/** Size animation options */
export interface ISizeAnimation extends IRangedAnimation {
  /**
   * The value to use for destroying the particle.
   */
  destroy: DestroyType | keyof typeof DestroyType;
}
