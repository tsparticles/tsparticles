import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import type { RecursivePartial } from "../../../../Types";
import { SizeAnimation } from "./SizeAnimation";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */
export class Size extends ValueWithRandom implements ISize, IOptionLoader<ISize> {
    animation;

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

        this.animation.load(data.animation);
    }
}
