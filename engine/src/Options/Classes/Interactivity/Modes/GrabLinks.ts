import type { IGrabLinks } from "../../../Interfaces/Interactivity/Modes/IGrabLinks";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class GrabLinks implements IGrabLinks, IOptionLoader<IGrabLinks> {
    blink;
    color?: OptionsColor;
    consent;
    opacity;

    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
    }

    load(data?: RecursivePartial<IGrabLinks>): void {
        if (data === undefined) {
            return;
        }

        if (data.blink !== undefined) {
            this.blink = data.blink;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.consent !== undefined) {
            this.consent = data.consent;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
