import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
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

    load(data?: RecursivePartial<IParticlesDensity>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        const width = data.width;

        if (width !== undefined) {
            this.width = width;
        }

        const height = data.height;

        if (height !== undefined) {
            this.height = height;
        }
    }
}
