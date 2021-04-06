import type { IDensity } from "../../../Interfaces/Particles/Number/IDensity";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Density implements IDensity, IOptionLoader<IDensity> {
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

    load(data?: RecursivePartial<IDensity>): void {
        if (data === undefined) {
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
