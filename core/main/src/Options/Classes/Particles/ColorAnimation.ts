import type { IColorAnimation } from "../../Interfaces/Particles/IColorAnimation";
import type { RecursivePartial } from "../../../Types";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";

export class ColorAnimation implements IColorAnimation, IOptionLoader<IColorAnimation> {
    public enable;
    public speed;
    public sync;

    constructor() {
        this.enable = false;
        this.speed = 1;
        this.sync = true;
    }

    public load(data?: RecursivePartial<IColorAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }

        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}
