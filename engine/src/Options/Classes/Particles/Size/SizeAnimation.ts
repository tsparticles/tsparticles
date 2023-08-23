import { DestroyType } from "../../../../Enums/Types/DestroyType";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISizeAnimation } from "../../../Interfaces/Particles/Size/ISizeAnimation";
import { RangedAnimationOptions } from "../../AnimationOptions";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

/**
 */
export class SizeAnimation extends RangedAnimationOptions implements ISizeAnimation, IOptionLoader<ISizeAnimation> {
    destroy: DestroyType | keyof typeof DestroyType;

    constructor() {
        super();

        this.destroy = DestroyType.none;
        this.speed = 5;
    }

    load(data?: RecursivePartial<ISizeAnimation>): void {
        super.load(data);

        if (!data) {
            return;
        }

        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
    }
}
