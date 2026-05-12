import type { IParticlesBounce, RangeValue } from "@tsparticles/engine";
import type { CollisionMode } from "../../CollisionMode.js";
import type { ICollisionsAbsorb } from "./ICollisionsAbsorb.js";
import type { ICollisionsOverlap } from "./ICollisionsOverlap.js";

/**
 * [[include:Collisions.md]]
 */
export interface ICollisions {
  /** The collisions absorb options */
  absorb: ICollisionsAbsorb;
  /** The collisions bounce options */
  bounce: IParticlesBounce;
  /** Enables collisions */
  enable: boolean;
  /** The maximum collision speed */
  maxSpeed: RangeValue;
  /** The collision mode */
  mode: CollisionMode | keyof typeof CollisionMode;
  /** The collision overlap options */
  overlap: ICollisionsOverlap;
}
