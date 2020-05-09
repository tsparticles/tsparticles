import type { IOptionsColor } from "../../Interfaces/Particles/IOptionsColor";
import type { IValueColor } from "../../../Core/Interfaces/IValueColor";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import type { IRgb } from "../../../Core/Interfaces/IRgb";
import type { IHsl } from "../../../Core/Interfaces/IHsl";

export class OptionsColor implements IOptionsColor {
    public value: string | IValueColor | IRgb | IHsl | string[];

    constructor() {
        this.value = "#fff";
    }

    public load(data?: RecursivePartial<IOptionsColor>): void {
        if (data !== undefined) {
            if (data.value !== undefined) {
                this.value = data.value;
            }
        }
    }

    public static create(source?: OptionsColor, data?: string | RecursivePartial<IOptionsColor>): OptionsColor {
        const color = source ?? new OptionsColor();

        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }

        return color;
    }
}
