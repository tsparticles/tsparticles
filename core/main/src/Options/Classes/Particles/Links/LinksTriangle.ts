import type { ILinksTriangle } from "../../../Interfaces/Particles/Links/ILinksTriangle";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class LinksTriangle implements ILinksTriangle, IOptionLoader<ILinksTriangle> {
    public color?: OptionsColor;
    public enable;
    public frequency;
    public opacity?: number;

    constructor() {
        this.enable = false;
        this.frequency = 1;
    }

    public load(data?: RecursivePartial<ILinksTriangle>): void {
        if (data === undefined) {
            return;
        }

        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
