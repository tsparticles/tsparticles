import type { ICollisions, IOptionLoader } from "../../../Interfaces";
import { CollisionMode } from "../../../../Enums";
import { CollisionsOverlap } from "./CollisionsOverlap";
import { ParticlesBounce } from "../Bounce";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 * [[include:Collisions.md]]
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    bounce;
    enable;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap;

    constructor() {
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }

    load(data?: RecursivePartial<ICollisions>): void {
        if (!data) {
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
