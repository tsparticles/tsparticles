import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
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
