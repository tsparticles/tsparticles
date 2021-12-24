import type { IOrbit } from "../../../Interfaces/Particles/Orbit/IOrbit";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OptionsColor } from "../../OptionsColor";
import { AnimationOptions } from "../../AnimationOptions";
import type { IAnimatable } from "../../../Interfaces/IAnimatable";
import { setRangeValue } from "../../../../Utils";

/**
 * [[include:Options/Particles/Orbit.md]]
 * @category Options
 */
export class Orbit implements IOrbit, IOptionLoader<IOrbit>, IAnimatable<AnimationOptions> {
    animation;
    enable: boolean;
    opacity: number;
    width: number;
    color?: OptionsColor;
    radius?: number;
    rotation: RangeValue;

    constructor() {
        this.animation = new AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = 0;
        this.width = 1;
    }

    load(data?: RecursivePartial<IOrbit>): void {
        if (!data) {
            return;
        }

        this.animation.load(data.animation);

        if (data.rotation !== undefined) {
            this.rotation = setRangeValue(data.rotation);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
        if (data.color !== undefined) {
            this.color = OptionsColor.create(this.color, data.color);
        }
    }
}
