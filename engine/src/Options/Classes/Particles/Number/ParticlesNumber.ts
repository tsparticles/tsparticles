import type { IParticlesNumber, IOptionLoader } from "../../../Interfaces";
import { ParticlesDensity } from "./ParticlesDensity";
import type { RecursivePartial } from "../../../../Types";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    density;
    limit;
    value;

    constructor() {
        this.density = new ParticlesDensity();
        this.limit = 0;
        this.value = 100;
    }

    load(data?: RecursivePartial<IParticlesNumber>): void {
        if (!data) {
            return;
        }

        this.density.load(data.density);

        if (data.limit !== undefined) {
            this.limit = data.limit;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
