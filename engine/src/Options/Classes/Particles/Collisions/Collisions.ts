import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions";
import { CollisionMode } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { Bounce } from "../Bounce/Bounce";
import { CollisionsOverlap } from "./CollisionsOverlap";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    bounce: Bounce;
    enable;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap;

    constructor() {
        this.bounce = new Bounce();
        this.enable = false;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }

    load(data?: RecursivePartial<ICollisions>): void {
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

        this.overlap.load(data.overlap);
    }
}
