import type { ICollisions } from "../../Interfaces/Particles/ICollisions";
import { CollisionMode } from "../../../Enums";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class Collisions implements ICollisions {
    public enable: boolean;
    public mode: CollisionMode;

    constructor() {
        this.enable = false;
        this.mode = CollisionMode.bounce;
    }

    public load(data?: RecursivePartial<ICollisions>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.mode !== undefined) {
                this.mode = data.mode;
            }
        }
    }
}
