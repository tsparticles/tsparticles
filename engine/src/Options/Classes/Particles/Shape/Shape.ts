import type { IOptionLoader, IShape } from "../../../Interfaces";
import type { RecursivePartial, ShapeData, SingleOrMultiple } from "../../../../Types";
import type { IShapeValues } from "../../../../Core";
import { deepExtend } from "../../../../Utils";

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
        if (!data) {
            return;
        }

        const options = data.options;

        if (options) {
            for (const shape of Object.keys(options)) {
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
