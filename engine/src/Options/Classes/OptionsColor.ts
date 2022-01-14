import type { IHsl, IHsv, IRgb, IValueColor } from "../../Core/Interfaces";
import type { RecursivePartial, SingleOrMultiple } from "../../Types";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptionsColor } from "../Interfaces/IOptionsColor";

/**
 * [[include:Color.md]]
 * @category Options
 */
export class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    value: SingleOrMultiple<SingleOrMultiple<string> | IValueColor | IRgb | IHsl | IHsv>;

    constructor() {
        this.value = "";
    }

    static create(
        source?: OptionsColor,
        data?: SingleOrMultiple<string> | RecursivePartial<IOptionsColor>
    ): OptionsColor {
        const color = new OptionsColor();

        color.load(source);

        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            } else {
                color.load(data);
            }
        }

        return color;
    }

    load(data?: RecursivePartial<IOptionsColor>): void {
        if (data?.value === undefined) {
            return;
        }

        this.value = data.value;
    }
}
