import {
  type IOptionLoader,
  ParticlesBounce,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import { CollisionMode } from "../../CollisionMode.js";
import { CollisionsAbsorb } from "./CollisionsAbsorb.js";
import { CollisionsOverlap } from "./CollisionsOverlap.js";
import type { ICollisions } from "../Interfaces/ICollisions.js";

/**
 * [[include:Options/Particles/Collisions.md]]
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
  /** The collisions absorb options */
  readonly absorb = new CollisionsAbsorb();
  /** The collisions bounce options */
  readonly bounce = new ParticlesBounce();
  /** Enables collisions */
  enable = false;
  /** The maximum collision speed */
  maxSpeed: RangeValue = 50;
  /** The collision mode */
  mode: CollisionMode | keyof typeof CollisionMode = CollisionMode.bounce;
  /** The collision overlap options */
  readonly overlap = new CollisionsOverlap();

  load(data?: RecursivePartial<ICollisions>): void {
    if (isNull(data)) {
      return;
    }

    this.absorb.load(data.absorb);
    this.bounce.load(data.bounce);

    loadProperty(this, "enable", data.enable);
    loadRangeProperty(this, "maxSpeed", data.maxSpeed);
    loadProperty(this, "mode", data.mode);

    this.overlap.load(data.overlap);
  }
}
