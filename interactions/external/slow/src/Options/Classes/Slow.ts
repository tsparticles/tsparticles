import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ISlow } from "../Interfaces/ISlow.js";

/**
 */
export class Slow implements ISlow, IOptionLoader<ISlow> {
    factor;
    radius;

    constructor() {
        this.factor = 3;
        this.radius = 200;
    }

    load(data?: RecursivePartial<ISlow>): void {
        if (isNull(data)) {
            return;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
