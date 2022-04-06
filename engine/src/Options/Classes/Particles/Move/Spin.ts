import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { deepExtend } from "../../../../Utils/Utils";
import { setRangeValue } from "../../../../Utils/NumberUtils";

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
