import type { CollisionMode } from "../../../Enums";

export interface ICollisions {
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
}
