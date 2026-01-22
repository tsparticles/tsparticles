import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull } from "@tsparticles/engine";
import { TiltDirection, type TiltDirectionAlt } from "../../TiltDirection.js";
import type { ITilt } from "../Interfaces/ITilt.js";
import { TiltAnimation } from "./TiltAnimation.js";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export class Tilt extends ValueWithRandom implements ITilt, IOptionLoader<ITilt> {
  animation;
  direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt;
  enable;

  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = TiltDirection.clockwise;
    this.enable = false;
    this.value = 0;
  }

  override load(data?: RecursivePartial<ITilt>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
