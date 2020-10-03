import type { CollisionMode } from "../../../Enums";
import type { IBounce } from "./Bounce/IBounce";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export interface ICollisions {
    bounce: IBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
}
