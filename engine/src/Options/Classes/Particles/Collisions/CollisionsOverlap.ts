import type { ICollisionsOverlap, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

export class CollisionsOverlap implements ICollisionsOverlap, IOptionLoader<ICollisionsOverlap> {
    enable: boolean;
    retries: number;

    constructor() {
        this.enable = true;
        this.retries = 0;
    }

    load(data?: RecursivePartial<ICollisionsOverlap>): void {
        if (!data) {
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
