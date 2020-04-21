import type { IRepulse } from "../../../../Interfaces/Options/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class Repulse implements IRepulse {
    public distance: number;
    public duration: number;
    public speed: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.speed = 1;
    }

    public load(data?: RecursivePartial<IRepulse>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }

            if (data.speed !== undefined) {
                this.speed = data.speed;
            }
        }
    }
}
