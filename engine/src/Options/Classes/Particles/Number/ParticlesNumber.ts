import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber";
import { ParticlesDensity } from "./ParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    get max(): number {
        return this.limit;
    }

    /**
     * @deprecated the max property is deprecated, please use the new limit
     */
    set max(value: number) {
        this.limit = value;
    }

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

        const limit = data.limit ?? data.max;

        if (limit !== undefined) {
            this.limit = limit;
        }

        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}
