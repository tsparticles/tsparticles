import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import type { RecursivePartial, ShapeData, SingleOrMultiple } from "../../../../Types";
import { deepExtend } from "../../../../Utils";
import type { IShapeValues } from "../../../../Core/Interfaces";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */
export class Shape implements IShape, IOptionLoader<IShape> {
    type: SingleOrMultiple<string>;
    options: ShapeData;

    constructor() {
        this.options = {};
        this.type = "circle";
    }

    load(data?: RecursivePartial<IShape>): void {
        if (data === undefined) {
            return;
        }

        const options = data.options;

        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];

                if (item !== undefined) {
                    this.options[shape] = deepExtend(this.options[shape] ?? {}, item) as IShapeValues[];
                }
            }
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
