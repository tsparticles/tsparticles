import type { IShape } from "../../../Interfaces/Particles/Shape/IShape.js";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues.js";
import { OptionLoader } from "../../../../Utils/OptionLoader.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { deepExtend } from "../../../../Utils/Utils.js";
import { loadProperty } from "../../../../Utils/OptionsUtils.js";

/**
 * [[include:Options/Particles/Shape.md]]
 */
export class Shape extends OptionLoader<IShape> implements IShape {
  close = true;
  options: ShapeData = {};
  type: SingleOrMultiple<string> = "circle";

  protected doLoad(data: RecursivePartial<IShape>): void {
    const options = data.options;

    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];

        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item) as IShapeValues[];
        }
      }
    }

    loadProperty(this, "close", data.close);
    loadProperty(this, "type", data.type);
  }
}
