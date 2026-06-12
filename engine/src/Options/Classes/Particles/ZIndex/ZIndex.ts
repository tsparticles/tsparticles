import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";
import { loadProperty } from "../../../../Utils/OptionsUtils.js";

/**
 * Z-index related particle behavior options.
 */
export class ZIndex extends ValueWithRandom implements IZIndex {
  opacityRate = 1;
  sizeRate = 1;
  velocityRate = 1;

  protected override doLoad(data: RecursivePartial<IZIndex>): void {
    super.doLoad(data);
    loadProperty(this, "opacityRate", data.opacityRate);
    loadProperty(this, "sizeRate", data.sizeRate);
    loadProperty(this, "velocityRate", data.velocityRate);
  }
}
