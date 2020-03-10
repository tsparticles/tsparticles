import {IDensity} from "../../../Interfaces/Options/Particles/IDensity";
import {Messages} from "../../Utils/Messages";
import {Utils} from "../../Utils/Utils";

export class Density implements IDensity {
    /**
     *
     * @deprecated this property is obsolete, please use the new area
     */
    public get value_area(): number {
        Messages.deprecated("particles.number.density.value_area", "particles.number.density.area");

        return this.area;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new area
     * @param value
     */
    public set value_area(value: number) {
        Messages.deprecated("particles.number.density.value_area", "particles.number.density.area");

        this.area = value;
    }

    public enable: boolean;
    public area: number;

    constructor() {
        this.enable = true;
        this.area = 800;
    }

    public load(data: IDensity): void {
        if (Utils.hasData(data)) {
            if (Utils.hasData(data.enable)) {
                this.enable = data.enable;
            }

            const area = data.area ?? data.value_area;

            if (Utils.hasData(area)) {
                this.area = data.area;
            }
        }
    }
}
