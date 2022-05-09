import { GradientColorOpacityAnimation } from "./GradientColorOpacityAnimation";
import type { IAnimatable } from "../../Interfaces/IAnimatable";
import type { IAnimation } from "../../Interfaces/IAnimation";
import type { IGradientColorOpacity } from "../../../Core/Interfaces/Gradients";
import type { IGradientColorOpacityAnimation } from "../../Interfaces/IOptionsGradient";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import type { RangeValue } from "../../../Types/RangeValue";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { setRangeValue } from "../../../Utils/NumberUtils";

export class GradientColorOpacity
    implements
        IGradientColorOpacity,
        IAnimatable<GradientColorOpacityAnimation>,
        IOptionLoader<IGradientColorOpacity & IAnimatable<IGradientColorOpacityAnimation>>
{
    animation;
    value: RangeValue;

    constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation();
    }

    load(data?: RecursivePartial<IGradientColorOpacity & IAnimatable<IAnimation>>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.value !== undefined) {
            this.value = setRangeValue(data.value);
        }
    }
}
