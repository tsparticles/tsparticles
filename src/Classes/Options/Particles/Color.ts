import type { IColor } from "../../../Interfaces/Options/Particles/IColor";
import type { IValueColor } from "../../../Interfaces/IValueColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IRgb } from "../../../Interfaces/IRgb";
import type { IHsl } from "../../../Interfaces/IHsl";

export class Color implements IColor {
    public value: string | IValueColor | IRgb | IHsl | string[];

    constructor() {
        this.value = "#fff";
    }

    public load(data?: RecursivePartial<IColor>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }
}
