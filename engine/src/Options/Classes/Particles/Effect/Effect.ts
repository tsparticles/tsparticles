import type { IEffect } from "../../../Interfaces/Particles/Effect/IEffect.js";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { deepExtend } from "../../../../Utils/Utils.js";
import { loadProperty } from "../../../../Utils/OptionsUtils.js";

/**
 * [[include:Options/Particles/Effect.md]]
 */
export class Effect extends OptionLoader<IEffect> implements IEffect {
  close = true;
  options: ShapeData = {};
  type: SingleOrMultiple<string> = [];

  protected doLoad(data: RecursivePartial<IEffect>): void {
    const options = data.options;

    if (options !== undefined) {
      for (const effect in options) {
        const item = options[effect];

        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item) as IShapeValues[];
        }
      }
    }

    loadProperty(this, "close", data.close);
    loadProperty(this, "type", data.type);
  }
}
