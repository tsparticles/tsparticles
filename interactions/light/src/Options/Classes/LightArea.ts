import type { IOptionLoader, RecursivePartial } from "tsparticles-engine";
import type { ILightArea } from "../Interfaces/ILightArea";
import { LightGradient } from "./LightGradient";

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
