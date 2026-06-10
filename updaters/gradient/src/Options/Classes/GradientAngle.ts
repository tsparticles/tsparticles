import {
  type IAnimatable,
  type IAnimation,
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  RotateDirection,
  type RotateDirectionAlt,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import { GradientAngleAnimation } from "./GradientAngleAnimation.js";
import type { IGradientAngle } from "../Interfaces/Gradients.js";

/** Gradient angle options class */
export class GradientAngle
  implements IGradientAngle, IAnimatable<IAnimation>, IOptionLoader<IGradientAngle & IAnimatable<IAnimation>>
{
  /** Angle animation */
  readonly animation = new GradientAngleAnimation();
  /** Angle direction */
  direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt = RotateDirection.clockwise;
  /** Angle value */
  value: RangeValue = 0;
  /** GradientAngle constructor */

  /**
   * Loads the gradient angle from data
   * @param data
   */
  load(data?: RecursivePartial<IGradientAngle & IAnimatable<IAnimation>>): void {
    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    loadRangeProperty(this, "value", data.value);
    loadProperty(this, "direction", data.direction);
  }
}
