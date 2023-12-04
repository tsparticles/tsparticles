import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize.js";
import { RangedAnimationValueWithRandom } from "../../ValueWithRandom.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { SizeAnimation } from "./SizeAnimation.js";

/**
 * [[include:Options/Particles/Size.md]]
 */
export class Size extends RangedAnimationValueWithRandom implements ISize, IOptionLoader<ISize> {
    readonly animation;

    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.value = 3;
    }

    load(data?: RecursivePartial<ISize>): void {
        super.load(data);

        if (!data) {
            return;
        }

        const animation = data.animation;

        if (animation !== undefined) {
            this.animation.load(animation);
        }
    }
}
