import type { CollisionMode } from "../../../Enums/CollisionMode";
import type { IOptionLoader } from "../IOptionLoader";

export interface ICollisions extends IOptionLoader<ICollisions> {
    enable: boolean;
    mode: CollisionMode;
}
