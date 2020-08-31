import type { IOptionsColor } from "../Interfaces/IOptionsColor";
import type { IValueColor } from "../../Core/Interfaces/IValueColor";
import type { RecursivePartial, SingleOrMultiple } from "../../Types";
import type { IRgb } from "../../Core/Interfaces/IRgb";
import type { IHsl } from "../../Core/Interfaces/IHsl";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    public value: SingleOrMultiple<string | IValueColor | IRgb | IHsl>;

    constructor() {
        this.value = "#fff";
    }

    public static create(source?: OptionsColor, data?: string | RecursivePartial<IOptionsColor>): OptionsColor {
        const color = source ?? new OptionsColor();

        if (data !== undefined) {
            color.load(typeof data === "string" ? { value: data } : data);
        }

        return color;
    }

    public load(data?: RecursivePartial<IOptionsColor>): void {
        if (data?.value === undefined) {
            return;
        }

        this.value = data.value;
    }
}
