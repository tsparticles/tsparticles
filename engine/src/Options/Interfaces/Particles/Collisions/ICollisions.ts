import type { CollisionMode } from "../../../../Enums";
import type { IParticlesBounce } from "../Bounce";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";

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
