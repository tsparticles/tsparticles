import type { IDensity } from "../../../Interfaces/Options/Particles/IDensity";
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

    public enable: boolean;
    public area: number;

    constructor() {
        this.enable = false;
        this.area = 800;
    }

    public load(data?: RecursivePartial<IDensity>): void {
        if (data !== undefined) {
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }

            if (data.area !== undefined) {
                this.area = data.area;
            } else if (data.value_area !== undefined) {
                this.value_area = data.value_area;
            }
        }
    }
}
