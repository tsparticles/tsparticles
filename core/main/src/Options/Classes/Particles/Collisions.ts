import type { ICollisions } from "../../Interfaces/Particles/ICollisions";
import { CollisionMode } from "../../../Enums";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { Bounce } from "./Bounce/Bounce";

/**
 * @category Options
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    public bounce: Bounce;
    public enable;
    public mode: CollisionMode | keyof typeof CollisionMode;

    constructor() {
        this.bounce = new Bounce();
        this.enable = false;
        this.mode = CollisionMode.bounce;
    }

    public load(data?: RecursivePartial<ICollisions>): void {
        if (data === undefined) {
            return;
        }

        this.bounce.load(data.bounce);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
    }
}
