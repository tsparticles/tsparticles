import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IShape } from "../../../Interfaces/Particles/Shape/IShape.js";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { deepExtend } from "../../../../Utils/Utils.js";
import { isNull } from "../../../../Utils/TypeUtils.js";

/**
 * [[include:Options/Particles/Shape.md]]
 */
export class Shape implements IShape, IOptionLoader<IShape> {
    close;
    fill;
    options: ShapeData;
    type: SingleOrMultiple<string>;

    constructor() {
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = "circle";
    }

    load(data?: RecursivePartial<IShape>): void {
        if (isNull(data)) {
            return;
        }

        const options = data.options;

        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];

                if (item) {
                    this.options[shape] = deepExtend(this.options[shape] ?? {}, item) as IShapeValues[];
                }
            }
        }

        if (data.close !== undefined) {
            this.close = data.close;
        }

        if (data.fill !== undefined) {
            this.fill = data.fill;
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
