import type { IMoveGravity } from "../../../Interfaces/Particles/Move/IMoveGravity.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/MathUtils.js";

export class MoveGravity implements IMoveGravity, IOptionLoader<IMoveGravity> {
    acceleration: RangeValue;
    enable;
    inverse;
    maxSpeed: RangeValue;

    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50;
    }

    load(data?: RecursivePartial<IMoveGravity>): void {
        if (isNull(data)) {
            return;
        }

        if (data.acceleration !== undefined) {
            this.acceleration = setRangeValue(data.acceleration);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.inverse !== undefined) {
            this.inverse = data.inverse;
        }

        if (data.maxSpeed !== undefined) {
            this.maxSpeed = setRangeValue(data.maxSpeed);
        }
    }
}
