import type { IAttract, IOptionLoader } from "../../../Interfaces";
import { EasingType } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types";

/**
 * @category Options
 */
export class Attract implements IAttract, IOptionLoader<IAttract> {
    distance;
    duration;
    easing;
    factor;
    maxSpeed;
    speed;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.easing = EasingType.easeOutQuad;
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1;
    }

    load(data?: RecursivePartial<IAttract>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.easing !== undefined) {
            this.easing = data.easing;
        }

        if (data.factor !== undefined) {
            this.factor = data.factor;
        }

        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
