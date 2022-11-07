import type { ICollisionsAbsorb } from "../../../Interfaces/Particles/Collisions/ICollisionsAbsorb";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";

export class CollisionsAbsorb implements ICollisionsAbsorb, IOptionLoader<ICollisionsAbsorb> {
    speed;

    constructor() {
        this.speed = 2;
    }

    load(data?: RecursivePartial<ICollisionsAbsorb>): void {
        if (!data) {
            return;
        }

        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}
