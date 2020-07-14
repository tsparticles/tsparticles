import type { IGrabLinks } from "../../../Interfaces/Interactivity/Modes/IGrabLinks";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class GrabLinks implements IGrabLinks, IOptionLoader<IGrabLinks> {
    public opacity: number;
    public color?: OptionsColor;

    constructor() {
        this.opacity = 1;
    }

    public load(data?: RecursivePartial<IGrabLinks>): void {
        if (data === undefined) {
            return;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
    }
}
