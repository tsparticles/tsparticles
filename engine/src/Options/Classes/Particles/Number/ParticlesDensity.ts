import type { IParticlesDensity, IOptionLoader } from "../../../Interfaces";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class ParticlesDensity implements IParticlesDensity, IOptionLoader<IParticlesDensity> {
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

        if (data.area !== undefined) {
            this.area = data.area;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}
