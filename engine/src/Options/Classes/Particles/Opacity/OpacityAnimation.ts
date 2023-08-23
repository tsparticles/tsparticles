import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOpacityAnimation } from "../../../Interfaces/Particles/Opacity/IOpacityAnimation";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

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
