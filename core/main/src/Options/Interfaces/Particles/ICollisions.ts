import type { CollisionMode } from "../../../Enums";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export interface ICollisions {
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
}
