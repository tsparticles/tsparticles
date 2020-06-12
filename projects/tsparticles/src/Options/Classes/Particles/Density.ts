import type { IDensity } from "../../Interfaces/Particles/IDensity";
import type { RecursivePartial } from "../../../Types/RecursivePartial";

export class Density implements IDensity {
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    public get value_area(): number {
        return this.area;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    public set value_area(value: number) {
        this.area = value;
    }

    public area: number;
    public enable: boolean;
    public factor: number;

    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }

    public load(data?: RecursivePartial<IDensity>): void {
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
