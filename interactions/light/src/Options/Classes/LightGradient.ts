import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ILightGradient } from "../Interfaces/ILightGradient";
import { OptionsColor } from "tsparticles-engine";

export class LightGradient implements ILightGradient, IOptionLoader<ILightGradient> {
    start;
    stop;

    constructor() {
        this.start = new OptionsColor();
        this.stop = new OptionsColor();

        this.start.value = "#ffffff";
        this.stop.value = "#000000";
    }

    load(data?: RecursivePartial<ILightGradient>): void {
        if (!data) {
            return;
        }

        this.start = OptionsColor.create(this.start, data.start);
        this.stop = OptionsColor.create(this.stop, data.stop);
    }
}
