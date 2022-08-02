import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ILinksTriangle } from "../Interfaces/ILinksTriangle";
import { OptionsColor } from "tsparticles-engine";

/**
 * @category Options
 */
export class LinksTriangle implements ILinksTriangle, IOptionLoader<ILinksTriangle> {
    color?: OptionsColor;
    enable;
    frequency;
    opacity?: number;

    constructor() {
        this.enable = false;
        this.frequency = 1;
    }

    load(data?: RecursivePartial<ILinksTriangle>): void {
        if (!data) {
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
