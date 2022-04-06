import type { ILightArea } from "../../../Interfaces/Interactivity/Modes/ILightArea";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { LightGradient } from "./LightGradient";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class LightArea implements ILightArea, IOptionLoader<ILightArea> {
    gradient;
    radius;

    constructor() {
        this.gradient = new LightGradient();
        this.radius = 1000;
    }

    load(data?: RecursivePartial<ILightArea>): void {
        if (!data) {
            return;
        }

        this.gradient.load(data.gradient);

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
