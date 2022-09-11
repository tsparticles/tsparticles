import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ICanvasMaskOverride } from "../Interfaces/ICanvasMaskOverride";

export class CanvasMaskOverride implements ICanvasMaskOverride, IOptionLoader<ICanvasMaskOverride> {
    color: boolean;
    opacity: boolean;

    constructor() {
        this.color = true;
        this.opacity = false;
    }

    load(data?: RecursivePartial<ICanvasMaskOverride>): void {
        if (!data) {
            return;
        }

        if (data.color !== undefined) {
            this.color = data.color;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}
