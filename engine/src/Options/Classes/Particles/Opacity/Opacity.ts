import type { IOpacity } from "../../../Interfaces/Particles/Opacity/IOpacity";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OpacityAnimation } from "./OpacityAnimation";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ValueWithRandom } from "../../ValueWithRandom";

/**
 * [[include:Options/Particles/Opacity.md]]
 */
export class Opacity extends ValueWithRandom implements IOpacity, IOptionLoader<IOpacity> {
    animation;

    constructor() {
        super();
        this.animation = new OpacityAnimation();
        this.random.minimumValue = 0.1;
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
