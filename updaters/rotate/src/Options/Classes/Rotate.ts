import {
  type IOptionLoader,
  type RecursivePartial,
  RotateDirection,
  type RotateDirectionAlt,
  ValueWithRandom,
  isNull,
  loadProperty,
} from "@tsparticles/engine";
import type { IRotate } from "../Interfaces/IRotate.js";
import { RotateAnimation } from "./RotateAnimation.js";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export class Rotate extends ValueWithRandom implements IRotate, IOptionLoader<IRotate> {
  /** Rotate animation options */
  readonly animation = new RotateAnimation();
  /** Rotate direction */
  direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt = RotateDirection.clockwise;
  /** Enables path rotation */
  path = false;
  /**
   * Loads the rotate options from data
   * @param data
   */
  override load(data?: RecursivePartial<IRotate>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    loadProperty(this, "direction", data.direction);

    this.animation.load(data.animation);

    loadProperty(this, "path", data.path);
  }
}
