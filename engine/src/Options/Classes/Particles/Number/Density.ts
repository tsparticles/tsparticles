import type { IDensity } from "../../../Interfaces/Particles/Number/IDensity";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Density implements IDensity, IOptionLoader<IDensity> {
    area;
    enable;
    factor;

    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }

    load(data?: RecursivePartial<IDensity>): void {
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
