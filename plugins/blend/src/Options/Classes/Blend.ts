import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { IBlend } from "../Interfaces/IBlend.js";

/**
 * [[include:Options/Blend.md]]
 */
export class Blend implements IBlend, IOptionLoader<IBlend> {
    /**
     * Background mask enabling options
     */
    enable;

    /**
     * Canvas composite operation
     * values here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
     */
    mode: GlobalCompositeOperation;

    constructor() {
        this.mode = "destination-out";
        this.enable = false;
    }

    load(data?: RecursivePartial<IBlend>): void {
        if (isNull(data)) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}
