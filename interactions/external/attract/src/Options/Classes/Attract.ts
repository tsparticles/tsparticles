import type { IAttract, IAttractRestore } from "../Interfaces/IAttract.js";
import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";

/** Attract mode options class */
export class Attract implements IAttract, IOptionLoader<IAttract> {
  /** Attraction distance in pixels */
  distance = 200;

  /** Attraction animation duration in seconds */
  duration = 0.4;

  /** Easing type used for the attraction animation */
  easing = "ease-out-quad";

  /** Attraction factor multiplier */
  factor = 1;

  /** Maximum speed of attracted particles */
  maxSpeed = 50;

  /** Restore behavior after attract interaction */
  restore: IAttractRestore;

  /** Attraction speed */
  speed = 1;

  constructor() {
    this.restore = {
      enable: false,
      delay: 0,
      speed: 0.08,
      follow: true,
    };
  }

  load(data?: RecursivePartial<IAttract>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);

    loadProperty(this, "duration", data.duration);

    if (data.easing !== undefined) {
      this.easing = data.easing;
    }

    loadProperty(this, "factor", data.factor);

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }

    loadProperty(this, "speed", data.speed);

    if (data.restore !== undefined) {
      this.restore.enable = data.restore.enable ?? this.restore.enable;
      this.restore.delay = data.restore.delay ?? this.restore.delay;
      this.restore.speed = data.restore.speed ?? this.restore.speed;
      this.restore.follow = data.restore.follow ?? this.restore.follow;
    }
  }
}
