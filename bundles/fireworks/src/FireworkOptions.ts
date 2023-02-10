import type { IOptionLoader, RangeValue, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { IFireworkOptions } from "./IFireworkOptions";
import { setRangeValue } from "tsparticles-engine";

export class FireworkOptions implements IFireworkOptions, IOptionLoader<IFireworkOptions> {
    brightness: RangeValue;
    colors: SingleOrMultiple<string>;
    gravity: RangeValue;
    minHeight: RangeValue;
    rate: RangeValue;
    saturation: RangeValue;
    sounds;
    speed: RangeValue;
    splitCount: RangeValue;

    constructor() {
        this.brightness = {
            min: -30,
            max: 30,
        };
        this.colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
        this.gravity = 5;
        this.minHeight = {
            min: 10,
            max: 30,
        };
        this.rate = 20;
        this.saturation = {
            min: -30,
            max: 30,
        };
        this.sounds = true;
        this.speed = { min: 5, max: 15 };
        this.splitCount = {
            min: 75,
            max: 150,
        };
    }

    load(data?: RecursivePartial<IFireworkOptions>): void {
        if (!data) {
            return;
        }

        if (data.colors !== undefined) {
            if (data.colors instanceof Array) {
                this.colors = [...data.colors];
            } else {
                this.colors = data.colors;
            }
        }

        if (data.brightness !== undefined) {
            this.brightness = setRangeValue(data.brightness);
        }

        if (data.gravity !== undefined) {
            this.gravity = setRangeValue(data.gravity);
        }

        if (data.minHeight !== undefined) {
            this.minHeight = setRangeValue(data.minHeight);
        }

        if (data.rate !== undefined) {
            this.rate = setRangeValue(data.rate);
        }

        if (data.saturation !== undefined) {
            this.saturation = setRangeValue(data.saturation);
        }

        if (data.sounds !== undefined) {
            this.sounds = data.sounds;
        }

        if (data.speed !== undefined) {
            this.speed = setRangeValue(data.speed);
        }

        if (data.splitCount !== undefined) {
            this.splitCount = setRangeValue(data.splitCount);
        }
    }
}
