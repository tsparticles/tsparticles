import type { IAbsorberSizeLimit } from "../Interfaces/IAbsorberSizeLimit";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types";

export class AbsorberSizeLimit implements IAbsorberSizeLimit, IOptionLoader<IAbsorberSizeLimit> {
    radius: number;
    mass: number;

    constructor() {
        this.radius = 0;
        this.mass = 0;
    }

    load(data?: RecursivePartial<IAbsorberSizeLimit>): void {
        if (!data) {
            return;
        }

        if (data.mass !== undefined) {
            this.mass = data.mass;
        }

        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}
