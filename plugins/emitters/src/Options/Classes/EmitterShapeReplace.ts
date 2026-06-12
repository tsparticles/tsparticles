import { type IOptionLoader, type RecursivePartial, isNull, loadProperty } from "@tsparticles/engine";
import type { IEmitterShapeReplace } from "../Interfaces/IEmitterShapeReplace.js";

export class EmitterShapeReplace implements IEmitterShapeReplace, IOptionLoader<IEmitterShapeReplace> {
  color = false;
  opacity = false;

  load(data?: RecursivePartial<IEmitterShapeReplace>): void {
    if (isNull(data)) {
      return;
    }

    loadProperty(this, "color", data.color);
    loadProperty(this, "opacity", data.opacity);
  }
}
