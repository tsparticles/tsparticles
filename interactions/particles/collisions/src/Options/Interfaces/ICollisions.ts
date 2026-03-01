import type { IParticlesBounce, RangeValue } from "@tsparticles/engine";
import type { CollisionMode } from "../../CollisionMode.js";
import type { ICollisionsAbsorb } from "./ICollisionsAbsorb.js";
import type { ICollisionsOverlap } from "./ICollisionsOverlap.js";

/**
 * [[include:Collisions.md]]
 */
export interface ICollisions {
  absorb: ICollisionsAbsorb;
  bounce: IParticlesBounce;
  enable: boolean;
  maxSpeed: RangeValue;
  mode: CollisionMode | keyof typeof CollisionMode;
  overlap: ICollisionsOverlap;
}
