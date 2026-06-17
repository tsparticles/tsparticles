import { GradientType, type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import { AnimatableGradientColor } from "./AnimatableGradientColor.js";
import { GradientAngle } from "./GradientAngle.js";
import type { IAnimatableGradient } from "../Interfaces/IAnimatableGradient.js";

/**
 * Animatable gradient options class
 * [[include:Options/Particles/Gradient.md]]
 */
export class AnimatableGradient implements IAnimatableGradient, IOptionLoader<IAnimatableGradient> {
  /** Gradient angle */
  readonly angle: GradientAngle = new GradientAngle();
  /** Gradient colors */
  colors: AnimatableGradientColor[] = [];
  /** Gradient type */
  type: GradientType = GradientType.random;
  /** AnimatableGradient constructor */

  /**
   * Loads the animatable gradient from data
   * @param data - The data to handle
   */
  load(data?: RecursivePartial<IAnimatableGradient>): void {
    if (isNull(data)) {
      return;
    }

    this.angle.load(data.angle);

    if (data.colors !== undefined) {
      this.colors = data.colors.map(s => {
        const tmp = new AnimatableGradientColor();

        tmp.load(s);

        return tmp;
      });
    }

    loadProperty(this, "type", data.type);
  }
}
