import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import type { RecursivePartial } from "../../../../Types";
import { ILightGradient } from "../../../Interfaces/Interactivity/Modes/ILightGradient";

export class LightGradient implements ILightGradient, IOptionLoader<ILightGradient> {
    public start;
    public stop;

    constructor() {
        this.start = new OptionsColor();
        this.stop = new OptionsColor();

        this.start.value = "#ffffff";
        this.stop.value = "#000000";
    }

    public load(data?: RecursivePartial<ILightGradient>): void {
        if (data === undefined) {
            return;
        }

        this.start = OptionsColor.create(this.start, data.start);
        this.stop = OptionsColor.create(this.stop, data.stop);
    }
}
