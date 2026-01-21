import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IParallax } from "../Interfaces/IParallax.js";

/**
 */
export class Parallax implements IParallax, IOptionLoader<IParallax> {
    force;
    smooth;

    constructor() {
        this.force = 2;
        this.smooth = 10;
    }

    load(data?: RecursivePartial<IParallax>): void {
        if (isNull(data)) {
            return;
        }

        if (data.force !== undefined) {
            this.force = data.force;
        }

        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
    }
}
