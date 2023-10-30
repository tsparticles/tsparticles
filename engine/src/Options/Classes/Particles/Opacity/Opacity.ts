import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OpacityAnimation } from "./OpacityAnimation.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export class Opacity extends ValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    animation;

    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.value = 1;
    }

    load(data?: RecursivePartial<IOpacity>): void {
        if (!data) {
            return;
        }

        super.load(data);

        const animation = data.animation;

        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
