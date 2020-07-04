import type { IRotateAnimation } from "../../../Interfaces/Particles/Rotate/IRotateAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

export class RotateAnimation implements IRotateAnimation, IOptionLoader<IRotateAnimation> {
    public enable: boolean;
    public speed: number;
    public sync: boolean;

    constructor() {
        this.enable = false;
        this.speed = 0;
        this.sync = false;
    }

    public load(data?: RecursivePartial<IRotateAnimation>): void {
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
