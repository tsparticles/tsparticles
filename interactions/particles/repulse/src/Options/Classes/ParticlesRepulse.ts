import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  ValueWithRandom,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { IParticlesRepulse } from "../Interfaces/IParticlesRepulse.js";

/** Particles repulse options class */
export class ParticlesRepulse extends ValueWithRandom implements IParticlesRepulse, IOptionLoader<IParticlesRepulse> {
  /** Repulse distance */
  distance: RangeValue;
  /** Repulse duration */
  duration: RangeValue;
  /** Enables particle repulse */
  enabled;
  /** Repulse factor */
  factor: RangeValue;
  /** Repulse speed */
  speed: RangeValue;

  constructor() {
    super();
    this.enabled = false;
    this.distance = 1;
    this.duration = 1;
    this.factor = 1;
    this.speed = 1;
  }

  /** @inheritDoc */
  override load(data?: RecursivePartial<IParticlesRepulse>): void {
    super.load(data);

    if (isNull(data)) {
      return;
    }

    loadProperty(this, "enabled", data.enabled);
    loadRangeProperty(this, "distance", data.distance);
    loadRangeProperty(this, "duration", data.duration);
    loadRangeProperty(this, "factor", data.factor);
    loadRangeProperty(this, "speed", data.speed);
  }
}
