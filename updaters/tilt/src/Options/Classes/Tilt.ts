import { type IOptionLoader, type RecursivePartial, ValueWithRandom, isNull, loadProperty } from "@tsparticles/engine";
import { TiltDirection, type TiltDirectionAlt } from "../../TiltDirection.js";
import type { ITilt } from "../Interfaces/ITilt.js";
import { TiltAnimation } from "./TiltAnimation.js";

/**
 * [[include:Options/Particles/Rotate.md]]
 */
export class Tilt extends ValueWithRandom implements ITilt, IOptionLoader<ITilt> {
  /** Tilt animation options */
  readonly animation = new TiltAnimation();
  /** Tilt direction */
  direction: TiltDirection | keyof typeof TiltDirection | TiltDirectionAlt = TiltDirection.clockwise;
  /** Enables the tilt */
  enable = false;
  /**
   * Loads the tilt options from data
   * @param data
   */
  override load(data?: RecursivePartial<ITilt>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    this.animation.load(data.animation);

    loadProperty(this, "direction", data.direction);
    loadProperty(this, "enable", data.enable);
  }
}
