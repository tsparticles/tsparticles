import type { ISize } from "../../../Interfaces/Particles/Size/ISize";
import { SizeAnimation } from "./SizeAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
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
        if (!data) {
            return;
        }

        super.load(data);

        this.animation.load(data.animation);
    }
}
