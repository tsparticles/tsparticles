import type { IZIndex } from "../../../Interfaces/Particles/ZIndex/IZIndex.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import { ValueWithRandom } from "../../ValueWithRandom.js";

/**
 * Z-index related particle behavior options.
 */
export class ZIndex extends ValueWithRandom implements IZIndex {
  opacityRate;
  sizeRate;
  velocityRate;

  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }

  protected override doLoad(data: RecursivePartial<IZIndex>): void {
    super.doLoad(data);

    if (data.opacityRate !== undefined) {
      this.opacityRate = data.opacityRate;
    }

    if (data.sizeRate !== undefined) {
      this.sizeRate = data.sizeRate;
    }

    if (data.velocityRate !== undefined) {
      this.velocityRate = data.velocityRate;
    }
  }
}
