import { type IOptionLoader, type RecursivePartial, isNull } from "@tsparticles/engine";
import type { ILightArea } from "../Interfaces/ILightArea.js";
import { LightGradient } from "./LightGradient.js";

export class LightArea implements ILightArea, IOptionLoader<ILightArea> {
    gradient;
    radius;

    constructor() {
        this.gradient = new LightGradient();
        this.radius = 1000;
    }

    load(data?: RecursivePartial<ILightArea>): void {
        if (isNull(data)) {
            return;
        }

        this.gradient.load(data.gradient);

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
