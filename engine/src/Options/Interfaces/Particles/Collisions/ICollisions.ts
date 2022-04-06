import type { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";
import type { IParticlesBounce } from "../Bounce/IParticlesBounce";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export interface ICollisions {
    bounce: IParticlesBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: ICollisionsOverlap;
}
