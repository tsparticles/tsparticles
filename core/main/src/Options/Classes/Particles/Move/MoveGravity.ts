import { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity";
import { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import { RecursivePartial } from "../../../../Types";

export class MoveGravity implements IMoveGravity, IOptionLoader<IMoveGravity> {
    acceleration;
    enable;
    maxSpeed;

    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.maxSpeed = 50;
    }

    load(data?: RecursivePartial<IMoveGravity>): void {
        if (!data) {
            return;
        }

        if (data.acceleration !== undefined) {
            this.acceleration = data.acceleration;
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
    }
}
