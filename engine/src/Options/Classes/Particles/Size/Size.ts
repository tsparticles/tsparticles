import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { SizeAnimation } from "./SizeAnimation.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";

/**
 * [[include:Options/Particles/Size.md]]
 */
export class Size extends ValueWithRandom implements ISize, IOptionLoader<ISize> {
    animation;

    constructor() {
        super();
        this.animation = new SizeAnimation();
        this.random.minimumValue = 1;
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
