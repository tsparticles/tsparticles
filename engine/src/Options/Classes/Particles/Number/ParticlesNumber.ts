import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber.js";
import { ParticlesDensity } from "./ParticlesDensity.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Particles/Number.md]]
 */
export class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    density;
    limit;
    value;

    constructor() {
        this.density = new ParticlesDensity();
        this.limit = 0;
        this.value = 0;
    }

    load(data?: RecursivePartial<IParticlesNumber>): void {
        if (!data) {
            return;
        }

        this.density.load(data.density);

        const limit = data.limit;

        if (limit !== undefined) {
            this.limit = limit;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
