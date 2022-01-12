import { AnimationOptions } from "../../AnimationOptions";
import type { IAnimatable } from "../../../Interfaces/IAnimatable";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IOrbit } from "../../../Interfaces/Particles/Orbit/IOrbit";
import { OptionsColor } from "../../OptionsColor";
import { OrbitRotation } from "./OrbitRotation";
import type { RecursivePartial } from "../../../../Types";

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
    rotation;

    constructor() {
        this.animation = new AnimationOptions();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new OrbitRotation();
        this.width = 1;
    }

    load(data?: RecursivePartial<IOrbit>): void {
        if (data === undefined) {
            return;
        }

        this.animation.load(data.animation);

        this.rotation.load(data.rotation);

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
