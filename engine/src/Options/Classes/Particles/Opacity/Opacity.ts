import type { IOpacity, IOptionLoader } from "../../../Interfaces";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
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

        this.animation.load(data.animation);
    }
}
