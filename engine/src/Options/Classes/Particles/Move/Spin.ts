import { loadProperty, loadRangeProperty } from "../../../../Utils/OptionsUtils.js";
import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { ISpin } from "../../../Interfaces/Particles/Move/ISpin.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { deepExtend } from "../../../../Utils/Utils.js";

export class Spin extends OptionLoader<ISpin> implements ISpin {
  acceleration: RangeValue = 0;
  enable = false;
  position?: ICoordinatesWithMode;

  protected doLoad(data: RecursivePartial<ISpin>): void {
    loadRangeProperty(this, "acceleration", data.acceleration);
    loadProperty(this, "enable", data.enable);

    if (data.position) {
      this.position = deepExtend({}, data.position) as ICoordinatesWithMode | undefined;
    }
  }
}
