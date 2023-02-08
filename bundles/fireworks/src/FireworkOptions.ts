import type { IOptionLoader, RangeValue, RecursivePartial, SingleOrMultiple } from "tsparticles-engine";
import type { IFireworkOptions } from "./IFireworkOptions";
import { setRangeValue } from "tsparticles-engine";

export class FireworkOptions implements IFireworkOptions, IOptionLoader<IFireworkOptions> {
    brightness: RangeValue;
    colors: SingleOrMultiple<string>;
    saturation: RangeValue;
    splitCount: RangeValue;

    constructor() {
        this.brightness = {
            min: -30,
            max: 30,
        };
        this.colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
        this.saturation = {
            min: -30,
            max: 30,
        };
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

        if (data.saturation !== undefined) {
            this.saturation = setRangeValue(data.saturation);
        }

        if (data.splitCount !== undefined) {
            this.splitCount = setRangeValue(data.splitCount);
        }
    }
}
