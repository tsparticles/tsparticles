import {
    type IOptionLoader,
    OptionsColor,
    type RecursivePartial,
    type SingleOrMultiple,
    executeOnSingleOrMultiple,
    isArray,
} from "@tsparticles/engine";
import type { IBubbleBase } from "../Interfaces/IBubbleBase.js";

/**
 */
export abstract class BubbleBase implements IBubbleBase, IOptionLoader<IBubbleBase> {
    color?: SingleOrMultiple<OptionsColor>;
    distance;
    duration;
    mix;
    opacity?: number;
    size?: number;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.mix = false;
    }

    load(data?: RecursivePartial<IBubbleBase>): void {
        if (!data) {
            return;
        }

        if (data.distance !== undefined) {
            this.distance = data.distance;
        }

        if (data.duration !== undefined) {
            this.duration = data.duration;
        }

        if (data.mix !== undefined) {
            this.mix = data.mix;
        }

        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }

        if (data.color !== undefined) {
            const sourceColor = isArray(this.color) ? undefined : this.color;

            this.color = executeOnSingleOrMultiple(data.color, color => {
                return OptionsColor.create(sourceColor, color);
            });
        }

        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}
