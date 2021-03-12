import type { IParallax } from "../../../Interfaces/Interactivity/Events/IParallax";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class Parallax implements IParallax, IOptionLoader<IParallax> {
    public enable;
    public force;
    public smooth;

    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }

    public load(data?: RecursivePartial<IParallax>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.force !== undefined) {
            this.force = data.force;
        }

        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
    }
}
