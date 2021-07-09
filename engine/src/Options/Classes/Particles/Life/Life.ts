import type { ILife } from "../../../Interfaces/Particles/Life/ILife";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";
import { LifeDelay } from "./LifeDelay";
import { LifeDuration } from "./LifeDuration";

export class Life implements ILife, IOptionLoader<ILife> {
    count;
    delay;
    duration;

    constructor() {
        this.count = 0;
        this.delay = new LifeDelay();
        this.duration = new LifeDuration();
    }

    load(data?: RecursivePartial<ILife>): void {
        if (data === undefined) {
            return;
        }

        if (data.count !== undefined) {
            this.count = data.count;
        }

        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}
