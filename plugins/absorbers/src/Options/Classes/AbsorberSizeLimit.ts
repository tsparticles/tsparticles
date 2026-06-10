import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IAbsorberSizeLimit } from "../Interfaces/IAbsorberSizeLimit.js";

export class AbsorberSizeLimit implements IAbsorberSizeLimit, IOptionLoader<IAbsorberSizeLimit> {
  mass;
  radius;

  constructor() {
    this.radius = 0;
    this.mass = 0;
  }

  load(data?: RecursivePartial<IAbsorberSizeLimit>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "mass", data.mass);
    loadProperty(this, "radius", data.radius);
  }
}
