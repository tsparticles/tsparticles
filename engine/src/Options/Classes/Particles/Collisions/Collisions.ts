import { CollisionMode } from "../../../../Enums/Modes/CollisionMode.js";
import { CollisionsAbsorb } from "./CollisionsAbsorb.js";
import { CollisionsOverlap } from "./CollisionsOverlap.js";
import type { ICollisions } from "../../../Interfaces/Particles/Collisions/ICollisions.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { ParticlesBounce } from "../Bounce/ParticlesBounce.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { setRangeValue } from "../../../../Utils/NumberUtils.js";

/**
 
 * [[include:Collisions.md]]
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    absorb;
    bounce;
    enable;
    maxSpeed: RangeValue;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap;

    constructor() {
        this.absorb = new CollisionsAbsorb();
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
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

        if (data.maxSpeed !== undefined) {
            this.maxSpeed = setRangeValue(data.maxSpeed);
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        this.overlap.load(data.overlap);
    }
}
