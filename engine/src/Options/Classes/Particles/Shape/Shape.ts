import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ShapeData } from "../../../../Types/ShapeData";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { deepExtend } from "../../../../Utils/Utils";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export class Shape implements IShape, IOptionLoader<IShape> {
    close;
    fill;
    options: ShapeData;
    type: SingleOrMultiple<string>;

    constructor() {
        this.options = {};
        this.type = "circle";
        this.close = true;
        this.fill = true;
    }

    load(data?: RecursivePartial<IShape>): void {
        if (!data) {
            return;
        }

        if (data.close !== undefined) {
            this.close = data.close;
        }

        if (data.fill !== undefined) {
            this.fill = data.fill;
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

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
