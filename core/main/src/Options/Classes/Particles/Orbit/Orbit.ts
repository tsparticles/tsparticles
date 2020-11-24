import type { IOrbit } from "../../../Interfaces/Particles/Orbit/IOrbit";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { OrbitAnimation } from "./OrbitAnimation";
import { OrbitRotation } from "./OrbitRotation";
import { OptionsColor } from "../../OptionsColor";

/**
 * [[include:Options/Particles/Orbit.md]]
 * @category Options
 */
export class Orbit implements IOrbit, IOptionLoader<IOrbit> {
    public animation;
    public enable: boolean;
    public opacity: number;
    public width: number;
    public color?: OptionsColor;
    public radius: number | undefined;
    public rotation;

    constructor() {
        this.animation = new OrbitAnimation();
        this.enable = false;
        this.opacity = 1;
        this.rotation = new OrbitRotation();
        this.width = 1;
    }

    public load(data?: RecursivePartial<IOrbit>): void {
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
