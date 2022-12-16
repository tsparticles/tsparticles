import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 * @category Options
 */
export class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
    enable;
    height;
    width;

    constructor() {
        this.enable = false;
        this.width = 1920;
        this.height = 1080;
    }

    /**
     * @deprecated this property is obsolete, please use the new width/height properties
     */
    get area(): number {
        return this.width;
    }

    /**
     * @deprecated this property is obsolete, please use the new width/height properties
     * @param value
     */
    set area(value: number) {
        this.width = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new width/height properties
     */
    get factor(): number {
        return this.height;
    }

    /**
     * @deprecated this property is obsolete, please use the new width/height properties
     * @param value
     */
    set factor(value: number) {
        this.height = value;
    }

    /**
     * @deprecated this property is obsolete, please use the new area property
     */
    get value_area(): number {
        return this.area;
    }

    /**
     * @deprecated this property is obsolete, please use the new area property
     * @param value
     */
    set value_area(value: number) {
        this.area = value;
    }

    load(data?: RecursivePartial<IParticlesDensity>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const width = data.width ?? data.area ?? data.value_area;

        if (width !== undefined) {
            this.width = width;
        }

        const height = data.height ?? data.factor;

        if (height !== undefined) {
            this.height = height;
        }
    }
}
