import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { deepExtend } from "../../../../Utils/Utils.js";
import { setRangeValue } from "../../../../Utils/MathUtils.js";

export class Spin extends OptionLoader<ISpin> implements ISpin {
  acceleration: RangeValue;
  enable;
  position?: ICoordinatesWithMode;

  constructor() {
    super();
    this.acceleration = 0;
    this.enable = false;
  }

  doLoad(data: RecursivePartial<ISpin>): void {
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
