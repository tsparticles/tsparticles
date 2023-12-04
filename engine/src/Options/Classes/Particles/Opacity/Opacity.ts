import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OpacityAnimation } from "./OpacityAnimation.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export class Opacity extends RangedAnimationValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    readonly animation;

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
