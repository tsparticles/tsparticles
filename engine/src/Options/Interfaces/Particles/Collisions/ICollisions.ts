import type { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import type { ICollisionsAbsorb } from "./ICollisionsAbsorb";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";
import type { IParticlesBounce } from "../Bounce/IParticlesBounce";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export interface ICollisions {
    absorb: ICollisionsAbsorb;
    bounce: IParticlesBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: ICollisionsOverlap;
}
