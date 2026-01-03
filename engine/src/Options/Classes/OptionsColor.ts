import type {
    IRangeHsl,
    IRangeHsv,
    IRangeHwb,
    IRangeLab,
    IRangeLch,
    IRangeOklab,
    IRangeOklch,
    IRangeRgb,
    IRangeValueColor,
} from "../../Core/Interfaces/Colors.js";
import { isArray, isNull, isString } from "../../Utils/TypeUtils.js";
import type { IOptionLoader } from "../Interfaces/IOptionLoader.js";
import type { IOptionsColor } from "../Interfaces/IOptionsColor.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * [[include:Color.md]]
 */
export class OptionsColor implements IOptionsColor, IOptionLoader<IOptionsColor> {
    value: SingleOrMultiple<
        | SingleOrMultiple<string>
        | IRangeValueColor
        | IRangeRgb
        | IRangeHsl
        | IRangeHsv
        | IRangeHwb
        | IRangeLab
        | IRangeLch
        | IRangeOklab
        | IRangeOklch
    >;

    constructor() {
        this.value = "";
    }

    static create(
        source?: OptionsColor,
        data?: SingleOrMultiple<string> | RecursivePartial<IOptionsColor>,
    ): OptionsColor {
        const color = new OptionsColor();

        color.load(source);

        if (data !== undefined) {
            if (isString(data) || isArray(data)) {
                color.load({ value: data });
            } else {
                color.load(data);
            }
        }

        return color;
    }

    load(data?: RecursivePartial<IOptionsColor>): void {
        if (isNull(data)) {
            return;
        }

        if (!isNull(data.value)) {
            this.value = data.value;
        }
    }
}
