import {IDensity} from "../../../Interfaces/Options/Particles/IDensity";

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
        this.enable = true;
        this.area = 800;
    }
}
