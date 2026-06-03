import type { IEffect } from "../../../Interfaces/Particles/Effect/IEffect.js";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues.js";
import { OptionLoader } from "../../../../Utils/OptionsUtils.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { deepExtend } from "../../../../Utils/Utils.js";

/**
 * [[include:Options/Particles/Effect.md]]
 */
export class Effect extends OptionLoader<IEffect> implements IEffect {
  close;
  options: ShapeData;
  type: SingleOrMultiple<string>;

  constructor() {
    super();
    this.close = true;
    this.options = {};
    this.type = [];
  }

  doLoad(data: RecursivePartial<IEffect>): void {
    const options = data.options;

    if (options !== undefined) {
      for (const effect in options) {
        const item = options[effect];

        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item) as IShapeValues[];
        }
      }
    }

    if (data.close !== undefined) {
      this.close = data.close;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
