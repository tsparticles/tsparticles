import type { IOrbitAnimation } from "../../../Interfaces/Particles/Orbit/IOrbitAnimation";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * @category Options
 */
export class OrbitAnimation implements IOrbitAnimation, IOptionLoader<IOrbitAnimation> {
    public enable;
    public speed;

    constructor() {
        this.enable = false;
        this.speed = 1;
    }

    public load(data?: RecursivePartial<IOrbitAnimation>): void {
        if (data === undefined) {
            return;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
