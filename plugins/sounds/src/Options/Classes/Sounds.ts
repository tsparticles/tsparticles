import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ISounds } from "../Interfaces/ISounds";
import { SoundsIcons } from "./SoundsIcons";

export class Sounds implements ISounds, IOptionLoader<ISounds> {
    enable;
    icons;

    constructor() {
        this.enable = false;
        this.icons = new SoundsIcons();
    }

    load(data?: RecursivePartial<ISounds>): void {
        if (!data) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.icons.load(data.icons);
    }
}
