import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    get value_area(): number {
        return this.area;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    set value_area(value: number) {
        this.area = value;
    }

    area;
    enable;
    factor;

    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }

    load(data?: RecursivePartial<IParticlesDensity>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const area = data.area ?? data.value_area;

        if (area !== undefined) {
            this.area = area;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}
