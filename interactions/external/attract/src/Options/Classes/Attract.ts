import { EasingType, type EasingTypeAlt, type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IAttract } from "../Interfaces/IAttract.js";

/** Attract mode options class */
export class Attract implements IAttract, IOptionLoader<IAttract> {
  /** Attraction distance in pixels */
  distance;

  /** Attraction animation duration in seconds */
  duration;

  /** Easing type used for the attraction animation */
  easing: EasingType | EasingTypeAlt;

  /** Attraction factor multiplier */
  factor;

  /** Maximum speed of attracted particles */
  maxSpeed;

  /** Attraction speed */
  speed;

  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.easing = EasingType.easeOutQuad;
    this.factor = 1;
    this.maxSpeed = 50;
    this.speed = 1;
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IAttract>): void {
    if (isNull(data)) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.easing !== undefined) {
      this.easing = data.easing;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }
}
