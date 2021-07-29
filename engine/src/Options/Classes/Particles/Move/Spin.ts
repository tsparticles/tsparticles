import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ICoordinates } from "../../../../Core/Interfaces";
import type { RangeValue, RecursivePartial } from "../../../../Types";
import { deepExtend, setRangeValue } from "../../../../Utils";

export class Spin implements ISpin, IOptionLoader<ISpin> {
    acceleration: RangeValue;
    enable;
    position?: ICoordinates;

    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }

    load(data?: RecursivePartial<ISpin>): void {
        if (!data) {
            return;
        }

        if (data.acceleration !== undefined) {
            this.acceleration = setRangeValue(data.acceleration);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        this.position = data.position ? (deepExtend({}, data.position) as ICoordinates | undefined) : undefined;
    }
}
