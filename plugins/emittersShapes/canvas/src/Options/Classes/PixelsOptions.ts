import type { IOptionLoader, RecursivePartial } from "@tsparticles/engine";

import type { IPixelsOptions } from "../Interfaces/IPixelsOptions.js";

export class PixelsOptions implements IPixelsOptions, IOptionLoader<IPixelsOptions> {
    offset: number;

    constructor() {
        this.offset = 4;
    }

    load(data?: RecursivePartial<IPixelsOptions> | undefined): void {
        if (!data) {
            return;
        }

        if (data.offset !== undefined) {
            this.offset = data.offset;
        }
    }
}
