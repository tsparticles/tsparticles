import {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {IValueColor} from "../../../Interfaces/IValueColor";
import {RecursivePartial} from "../../../Types/RecursivePartial";
import {IRgb} from "../../../Interfaces/IRgb";
import {IHsl} from "../../../Interfaces/IHsl";

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
