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
  animation;
  /** Angle direction */
  direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
  /** Angle value */
  value: RangeValue;

  /** GradientAngle constructor */
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
    this.direction = RotateDirection.clockwise;
  }

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
