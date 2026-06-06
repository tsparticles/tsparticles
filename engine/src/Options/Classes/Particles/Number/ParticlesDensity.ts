import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";

/**
 * Density options used to scale particle count with area.
 */
export class ParticlesDensity extends OptionLoader<IParticlesDensity> implements IParticlesDensity {
  enable;
  height;
  width;

  constructor() {
    super();
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }

  protected doLoad(data: RecursivePartial<IParticlesDensity>): void {
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const width = data.width;

    if (width !== undefined) {
      this.width = width;
    }

    const height = data.height;

    if (height !== undefined) {
      this.height = height;
    }
  }
}
