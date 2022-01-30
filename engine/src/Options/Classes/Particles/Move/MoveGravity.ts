import { IMoveGravity, IOptionLoader } from "../../../Interfaces";
import { RecursivePartial } from "../../../../Types";

export class MoveGravity implements IMoveGravity, IOptionLoader<IMoveGravity> {
    acceleration;
    enable;
    inverse;
    maxSpeed;

    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
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

        if (data.inverse !== undefined) {
            this.inverse = data.inverse;
        }

        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
    }
}
