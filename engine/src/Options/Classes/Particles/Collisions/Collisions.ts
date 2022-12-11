import { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import { CollisionsAbsorb } from "./CollisionsAbsorb";
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
    absorb;
    bounce;
    enable;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap;

    constructor() {
        this.absorb = new CollisionsAbsorb();
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }

    load(data?: RecursivePartial<ICollisions>): void {
        if (!data) {
            return;
        }

        this.absorb.load(data.absorb);
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
