import type { CollisionMode } from "../../../../Enums";
import type { IBounce } from "../Bounce/IBounce";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";

/**
 * @category Options
 * [[include:Options/Particles/Collisions.md]]
 */
export interface ICollisions {
    bounce: IBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: ICollisionsOverlap;
}
