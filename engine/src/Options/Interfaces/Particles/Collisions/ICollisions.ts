import type { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import type { ICollisionsAbsorb } from "./ICollisionsAbsorb";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";
import type { IParticlesBounce } from "../Bounce/IParticlesBounce";
import type { RangeValue } from "../../../../Types/RangeValue";

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
