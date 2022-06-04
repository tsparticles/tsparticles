import type { IOptionLoader, IRangeValue, RangeValue, RecursivePartial } from "tsparticles-engine";
import type { IWobble } from "../Interfaces/IWobble";
import type { IWobbleSpeed } from "../Interfaces/IWobbleSpeed";
import { WobbleSpeed } from "./WobbleSpeed";
import { setRangeValue } from "tsparticles-engine";

export class Wobble implements IWobble, IOptionLoader<IWobble> {
    distance: RangeValue;
    enable: boolean;
    speed: WobbleSpeed;

    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = new WobbleSpeed();
    }

    load(data?: RecursivePartial<IWobble>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = setRangeValue(data.distance);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.speed !== undefined) {
            if (typeof data.speed === "number") {
                this.speed.load({ angle: data.speed });
            } else {
                const rangeSpeed = data.speed as IRangeValue;

                if (rangeSpeed.min !== undefined) {
                    this.speed.load({ angle: rangeSpeed });
                } else {
                    this.speed.load(data.speed as IWobbleSpeed);
                }
            }
        }
    }
}
