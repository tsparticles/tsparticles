import type { IOrbit } from "../../../Interfaces/Particles/IOrbit";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IHsl } from "../../../../Core/Interfaces/Colors";
/**
 * [[include:Options/Particles/Orbit.md]]
 * @category Options
 */
export class Orbit implements IOrbit, IOptionLoader<IOrbit> {
    public enable: boolean;
    public opacity: number;
    public width: number;
    public color: IHsl | undefined;
    public radius: number;
    public rotation: number;

    constructor() {
        this.enable = false;
        this.opacity = 1;
        this.width = 0;
        this.radius = 0;
        this.rotation = 0;
    }

    public load(data?: RecursivePartial<IOrbit>): void {
        if (data === undefined) {
            return;
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
        if (data.rotation !== undefined) {
            this.rotation = data.rotation;
        }
    }
}
