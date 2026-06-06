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
import type { IOptionsColor } from "../Interfaces/IOptionsColor.js";
import { OptionLoader } from "../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";
import type { SingleOrMultiple } from "../../Types/SingleOrMultiple.js";

/**
 * [[include:Color.md]]
 */
export class OptionsColor extends OptionLoader<IOptionsColor> implements IOptionsColor {
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
    super();
    this.value = "";
  }

  /**
   * Creates an options color from optional source and input data.
   * @param source - Existing color instance to clone from.
   * @param data - Color input data.
   * @returns A configured color instance.
   */
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

  protected doLoad(data: RecursivePartial<IOptionsColor>): void {
    if (!isNull(data.value)) {
      this.value = data.value;
    }
  }
}
