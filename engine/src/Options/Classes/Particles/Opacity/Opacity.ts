import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { OpacityAnimation } from "./OpacityAnimation.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export class Opacity extends RangedAnimationValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    override readonly animation;

    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.value = 1;
    }

    override load(data?: RecursivePartial<IOpacity>): void {
        if (isNull(data)) {
            return;
        }

        super.load(data);

        const animation = data.animation;

        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
