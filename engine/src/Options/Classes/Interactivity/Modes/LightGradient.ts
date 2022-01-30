import type { ILightGradient, IOptionLoader } from "../../../Interfaces";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";

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
