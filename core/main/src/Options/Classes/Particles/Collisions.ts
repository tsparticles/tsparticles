import type { ICollisions } from "../../Interfaces/Particles/ICollisions";
import { CollisionMode } from "../../../Enums";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    public enable: boolean;
    public mode: CollisionMode | keyof typeof CollisionMode;

    constructor() {
        this.enable = false;
        this.mode = CollisionMode.bounce;
    }

    public load(data?: RecursivePartial<ICollisions>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
    }
}
