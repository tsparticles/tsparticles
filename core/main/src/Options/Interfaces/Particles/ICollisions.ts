import type { CollisionMode } from "../../../Enums";

/**
 * @category Options
 */
export interface ICollisions {
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
}
