import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISoundsIcon } from "../Interfaces/ISoundsIcon";

export class SoundsIcon implements ISoundsIcon, IOptionLoader<ISoundsIcon> {
    height;
    path?: string;
    svg?: string;
    width;

    constructor() {
        this.width = 24;
        this.height = 24;
    }

    load(data?: RecursivePartial<ISoundsIcon>): void {
        if (!data) {
            return;
        }

        if (data.path !== undefined) {
            this.path = data.path;
        }

        if (data.svg !== undefined) {
            this.svg = data.svg;
        }

        if (data.width !== undefined) {
            this.width = data.width;
        }

        if (data.height !== undefined) {
            this.height = data.height;
        }
    }
}
