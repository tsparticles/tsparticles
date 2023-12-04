import type { IOptionLoader, IRgba, RecursivePartial } from "@tsparticles/engine";
import { isFunction, isString } from "@tsparticles/engine";
import type { ICanvasMaskPixels } from "../Interfaces/ICanvasMaskPixels.js";

export class CanvasMaskPixels implements ICanvasMaskPixels, IOptionLoader<ICanvasMaskPixels> {
    filter: (pixel: IRgba) => boolean;
    offset: number;

    constructor() {
        this.filter = (pixel): boolean => pixel.a > 0;
        this.offset = 4;
    }

    load(data?: RecursivePartial<ICanvasMaskPixels> | undefined): void {
        if (!data) {
            return;
        }

        if (data.filter !== undefined) {
            if (isString(data.filter)) {
                if (Object.hasOwn(window, data.filter)) {
                    const filter = (window as unknown as { [key: string]: (pixel: IRgba) => boolean })[data.filter];

                    if (isFunction(filter)) {
                        this.filter = filter;
                    }
                }
            } else {
                this.filter = data.filter;
            }
        }

        if (data.offset !== undefined) {
            this.offset = data.offset;
        }
    }
}
