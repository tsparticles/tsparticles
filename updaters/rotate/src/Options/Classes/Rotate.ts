import {
  type IOptionLoader,
  type RecursivePartial,
  RotateDirection,
  type RotateDirectionAlt,
  ValueWithRandom,
  isNull,
} from "@tsparticles/engine";
import type { IRotate } from "../Interfaces/IRotate.js";
import { RotateAnimation } from "./RotateAnimation.js";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export class Rotate extends ValueWithRandom implements IRotate, IOptionLoader<IRotate> {
  /** Rotate animation options */
  animation;
  /** Rotate direction */
  direction: RotateDirection | keyof typeof RotateDirection | RotateDirectionAlt;
  /** Enables path rotation */
  path;

  /** Rotate constructor */
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = RotateDirection.clockwise;
    this.path = false;
    this.value = 0;
  }

  /**
   * Loads the rotate options from data
   * @param data
   */
  override load(data?: RecursivePartial<IRotate>): void {
    if (isNull(data)) {
      return;
    }

    super.load(data);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    this.animation.load(data.animation);

    if (data.path !== undefined) {
      this.path = data.path;
    }
  }
}
