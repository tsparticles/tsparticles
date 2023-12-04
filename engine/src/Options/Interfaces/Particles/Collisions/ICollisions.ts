import type { CollisionMode } from "../../../../Enums/Modes/CollisionMode.js";
import type { ICollisionsAbsorb } from "./ICollisionsAbsorb.js";
import type { ICollisionsOverlap } from "./ICollisionsOverlap.js";
import type { IParticlesBounce } from "../Bounce/IParticlesBounce.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

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
