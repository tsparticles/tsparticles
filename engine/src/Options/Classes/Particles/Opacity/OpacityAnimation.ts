import { DestroyType } from "../../../../Enums/Types/DestroyType.js";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import { RangedAnimationOptions } from "../../AnimationOptions.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 */
export class OpacityAnimation
    extends RangedAnimationOptions
    implements IOpacityAnimation, IOptionLoader<IOpacityAnimation>
{
    destroy: DestroyType | keyof typeof DestroyType;

    constructor() {
        super();
        this.destroy = DestroyType.none;
        this.speed = 2;
    }

    load(data?: RecursivePartial<IOpacityAnimation>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
