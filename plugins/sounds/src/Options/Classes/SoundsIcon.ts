import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISoundsIcon } from "../Interfaces/ISoundsIcon";

export class SoundsIcon implements ISoundsIcon, IOptionLoader<ISoundsIcon> {
    path?: string;
    svg?: string;

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
    }
}
