import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IAbsorberSizeLimit } from "../Interfaces/IAbsorberSizeLimit.js";

export class AbsorberSizeLimit implements IAbsorberSizeLimit, IOptionLoader<IAbsorberSizeLimit> {
  mass = 0;
  radius = 0;

  load(data?: RecursivePartial<IAbsorberSizeLimit>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "mass", data.mass);
    loadProperty(this, "radius", data.radius);
  }
}
