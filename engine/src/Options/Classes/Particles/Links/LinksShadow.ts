import type { ILinksShadow, IOptionLoader } from "../../../Interfaces";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class LinksShadow implements ILinksShadow, IOptionLoader<ILinksShadow> {
    blur;
    color;
    enable;

    constructor() {
        this.blur = 5;
        this.color = new OptionsColor();
        this.color.value = "#000";
        this.enable = false;
    }

    load(data?: RecursivePartial<ILinksShadow>): void {
        if (!data) {
            return;
        }

        if (data.blur !== undefined) {
            this.blur = data.blur;
        }

        this.color = OptionsColor.create(this.color, data.color);

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
