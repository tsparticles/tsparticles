import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IAbsorberSizeLimit } from "../Interfaces/IAbsorberSizeLimit.js";

export class AbsorberSizeLimit implements IAbsorberSizeLimit, IOptionLoader<IAbsorberSizeLimit> {
    mass: number;
    radius: number;

    constructor() {
        this.radius = 0;
        this.mass = 0;
    }

    load(data?: RecursivePartial<IAbsorberSizeLimit>): void {
        if (isNull(data)) {
            return;
        }

        if (data.mass !== undefined) {
            this.mass = data.mass;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
