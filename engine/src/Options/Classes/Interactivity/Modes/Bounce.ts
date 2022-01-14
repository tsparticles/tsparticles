import type { IBounce, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

export class Bounce implements IBounce, IOptionLoader<IBounce> {
    distance: number;

    constructor() {
        this.distance = 200;
    }

    load(data?: RecursivePartial<IBounce>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}
