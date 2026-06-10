import { OptionLoader, loadProperty } from "../../../../Utils/OptionsUtils.js";
import type { IParticlesDensity } from "../../../Interfaces/Particles/Number/IParticlesDensity.js";
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
    loadProperty(this, "enable", data.enable);
    loadProperty(this, "width", data.width);
    loadProperty(this, "height", data.height);
  }
}
