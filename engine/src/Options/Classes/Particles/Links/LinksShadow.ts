import type { ILinksShadow } from "../../../Interfaces/Particles/Links/ILinksShadow";
import type { RecursivePartial } from "../../../../Types";
import { OptionsColor } from "../../OptionsColor";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

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
        this.enable = false;
    }

    load(data?: RecursivePartial<ILinksShadow>): void {
        if (data === undefined) {
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
