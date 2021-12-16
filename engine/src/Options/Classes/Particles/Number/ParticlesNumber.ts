import type { IParticlesNumber } from "../../../Interfaces/Particles/Number/IParticlesNumber";
import { Density } from "./Density";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */
export class ParticlesNumber implements IParticlesNumber, IOptionLoader<IParticlesNumber> {
    density;
    limit;
    value;

    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 100;
    }

    load(data?: RecursivePartial<IParticlesNumber>): void {
        if (data === undefined) {
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
