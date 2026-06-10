import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IRepulseBase, IRepulseRestore } from "../Interfaces/IRepulseBase.js";

/**
 * Repulse mode base options
 */
export abstract class RepulseBase implements IRepulseBase, IOptionLoader<IRepulseBase> {
  /** Repulse distance in pixels */
  distance;
  /** Repulse animation duration in seconds */
  duration;
  /** Easing type used for the repulse animation */
  easing: string;
  /** Repulse factor multiplier */
  factor;
  /** Maximum repulse speed */
  maxSpeed;
  /** Restore behavior after repulse interaction */
  restore: IRepulseRestore;
  /** Repulse speed */
  speed;

  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = "ease-out-quad";
    this.restore = {
      enable: false,
      delay: 0,
      speed: 0.08,
      follow: true,
    };
  }

  /** @inheritDoc */
  load(data?: RecursivePartial<IRepulseBase>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "distance", data.distance);
    loadProperty(this, "duration", data.duration);
    loadProperty(this, "easing", data.easing);
    loadProperty(this, "factor", data.factor);
    loadProperty(this, "speed", data.speed);
    loadProperty(this, "maxSpeed", data.maxSpeed);

    if (data.restore !== undefined) {
      this.restore.enable = data.restore.enable ?? this.restore.enable;
      this.restore.delay = data.restore.delay ?? this.restore.delay;
      this.restore.speed = data.restore.speed ?? this.restore.speed;
      this.restore.follow = data.restore.follow ?? this.restore.follow;
    }
  }
}
