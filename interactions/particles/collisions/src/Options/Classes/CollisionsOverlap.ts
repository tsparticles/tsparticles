import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ICollisionsOverlap } from "../Interfaces/ICollisionsOverlap.js";

export class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
    enable: boolean;
    retries: number;

    constructor() {
        this.enable = true;
        this.retries = 0;
    }

    load(data?: RecursivePartial<ICollisionsOverlap>): void {
        if (isNull(data)) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}
