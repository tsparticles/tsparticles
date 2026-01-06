import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { deepExtend } from "../../../../Utils/Utils.js";
import { isNull } from "../../../../Utils/TypeUtils.js";
import { setRangeValue } from "../../../../Utils/MathUtils.js";

export class Spin implements ISpin, IOptionLoader<ISpin> {
    acceleration: RangeValue;
    enable;
    position?: ICoordinatesWithMode;

    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }

    load(data?: RecursivePartial<ISpin>): void {
        if (isNull(data)) {
            return;
        }

        if (data.acceleration !== undefined) {
            this.acceleration = setRangeValue(data.acceleration);
        }

        if (data.enable !== undefined) {
            this.enable = data.enable;
        }

        if (data.position) {
            this.position = deepExtend({}, data.position) as ICoordinatesWithMode | undefined;
        }
    }
}
