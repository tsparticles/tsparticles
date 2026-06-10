import { type IOptionLoader, type RecursivePartial, deepExtend, isNull, loadProperty } from "@tsparticles/engine";
import { EmitterShapeReplace } from "./EmitterShapeReplace.js";
import type { IEmitterShape } from "../Interfaces/IEmitterShape.js";

export class EmitterShape implements IEmitterShape, IOptionLoader<IEmitterShape> {
  options: Record<string, unknown> = {};
  readonly replace = new EmitterShapeReplace();
  type = "square";

  load(data?: RecursivePartial<IEmitterShape>): void {
    if (isNull(data)) {
      return;
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options ?? {}) as Record<string, unknown>;
    }

    this.replace.load(data.replace);

    loadProperty(this, "type", data.type);
  }
}
