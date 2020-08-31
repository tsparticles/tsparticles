import type { CollisionMode } from "../../../Enums";
import type { IBounce } from "./Bounce/IBounce";

/**
 * @category Options
 */
export interface ICollisions {
    bounce: IBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
}
