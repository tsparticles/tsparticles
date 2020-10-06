import type { ILightArea } from "../../../Interfaces/Interactivity/Modes/ILightArea";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LightGradient } from "./LightGradient";
import type { RecursivePartial } from "../../../../Types";

export class LightArea implements ILightArea, IOptionLoader<ILightArea> {
    public gradient;
    public radius;

    constructor() {
        this.gradient = new LightGradient();
        this.radius = 1000;
    }

    public load(data?: RecursivePartial<ILightArea>): void {
        if (data === undefined) {
            return;
        }

        this.gradient.load(data.gradient);

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
