import type {IParticlesNumber} from "../../../Interfaces/Options/Particles/IParticlesNumber";
import type {IDensity} from "../../../Interfaces/Options/Particles/IDensity";
import {Density} from "./Density";
import type {RecursivePartial} from "../../../Types/RecursivePartial";

export class ParticlesNumber implements IParticlesNumber {
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

    public density: IDensity;
    public limit: number;
    public value: number;

    constructor() {
        this.density = new Density();
        this.limit = 0;
        this.value = 100;
    }

    public load(data?: RecursivePartial<IParticlesNumber>): void {
        if (data !== undefined) {
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
}
