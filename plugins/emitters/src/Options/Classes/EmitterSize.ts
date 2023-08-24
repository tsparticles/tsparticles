import { type IOptionLoader, PixelMode, type RecursivePartial } from "@tsparticles/engine";
import type { IEmitterSize } from "../Interfaces/IEmitterSize";

/**
 */
export class EmitterSize implements IEmitterSize, IOptionLoader<IEmitterSize> {
    height;
    mode: PixelMode | keyof typeof PixelMode;
    width;

    constructor() {
        this.mode = PixelMode.percent;
        this.height = 0;
        this.width = 0;
    }

    load(data?: RecursivePartial<IEmitterSize>): void {
        if (data === undefined) {
            return;
        }

        if (data.mode !== undefined) {
            this.mode = data.mode;
        }

        if (data.height !== undefined) {
            this.height = data.height;
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
