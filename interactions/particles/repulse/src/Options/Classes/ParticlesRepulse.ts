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
  distance: RangeValue = 1;
  /** Repulse duration */
  duration: RangeValue = 1;
  /** Enables particle repulse */
  enabled = false;
  /** Repulse factor */
  factor: RangeValue = 1;
  /** Repulse speed */
  speed: RangeValue = 1;

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
