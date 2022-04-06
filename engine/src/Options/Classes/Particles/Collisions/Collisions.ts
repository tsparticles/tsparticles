import { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import { CollisionsOverlap } from "./CollisionsOverlap";
import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { ParticlesBounce } from "../Bounce/ParticlesBounce";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

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
