import type { CollisionMode } from "../../../../Enums";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";
import type { IParticlesBounce } from "../Bounce";

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
