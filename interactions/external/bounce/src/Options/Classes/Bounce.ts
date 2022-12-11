import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { IBounce } from "../Interfaces/IBounce";

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
