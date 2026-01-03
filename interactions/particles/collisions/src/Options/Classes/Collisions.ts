import {
    type IOptionLoader,
    ParticlesBounce,
    type RangeValue,
    type RecursivePartial,
    isNull,
    setRangeValue,
} from "@tsparticles/engine";
import { CollisionMode } from "../../CollisionMode.js";
import { CollisionsAbsorb } from "./CollisionsAbsorb.js";
import { CollisionsOverlap } from "./CollisionsOverlap.js";
import type { ICollisions } from "../Interfaces/ICollisions.js";

/**
 * [[include:Collisions.md]]
 */
export class Collisions implements ICollisions, IOptionLoader<ICollisions> {
    readonly absorb;
    readonly bounce;
    enable;
    maxSpeed: RangeValue;
    mode: CollisionMode | keyof typeof CollisionMode;
    readonly overlap;

    constructor() {
        this.absorb = new CollisionsAbsorb();
        this.bounce = new ParticlesBounce();
        this.enable = false;
        this.maxSpeed = 50;
        this.mode = CollisionMode.bounce;
        this.overlap = new CollisionsOverlap();
    }

    load(data?: RecursivePartial<ICollisions>): void {
        if (isNull(data)) {
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
