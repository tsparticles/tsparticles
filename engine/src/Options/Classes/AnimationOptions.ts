import type { IAnimation } from "../Interfaces/IAnimation";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../Types";

export class AnimationOptions implements IAnimation, IOptionLoader<IAnimation> {
    count: number;
    enable: boolean;
    speed: number;
    sync: boolean;

    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.sync = false;
    }

    load(data?: RecursivePartial<IAnimation>): void {
        if (!data) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
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
