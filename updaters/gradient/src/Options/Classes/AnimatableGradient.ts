import { GradientType, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import { AnimatableGradientColor } from "./AnimatableGradientColor.js";
import { GradientAngle } from "./GradientAngle.js";
import type { IAnimatableGradient } from "../Interfaces/IAnimatableGradient.js";

/** Animatable gradient options class */
export class AnimatableGradient implements IAnimatableGradient, IOptionLoader<IAnimatableGradient> {
  /** Gradient angle */
  angle: GradientAngle;
  /** Gradient colors */
  colors: AnimatableGradientColor[];
  /** Gradient type */
  type: GradientType;

  /** AnimatableGradient constructor */
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = GradientType.random;
  }

  /**
   * Loads the animatable gradient from data
   * @param data
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

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
