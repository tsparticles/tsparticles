import type { IEffect } from "../../../Interfaces/Particles/Effect/IEffect.js";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader.js";
import type { IShapeValues } from "../../../../Core/Interfaces/IShapeValues.js";
import type { RecursivePartial } from "../../../../Types/RecursivePartial.js";
import type { ShapeData } from "../../../../Types/ShapeData.js";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple.js";
import { deepExtend } from "../../../../Utils/Utils.js";

/**
 * [[include:Options/Particles/Effect.md]]
 */
export class Effect implements IEffect, IOptionLoader<IEffect> {
    close;
    fill;
    options: ShapeData;
    type: SingleOrMultiple<string>;

    constructor() {
        this.close = true;
        this.fill = true;
        this.options = {};
        this.type = [];
    }

    load(data?: RecursivePartial<IEffect>): void {
        if (!data) {
            return;
        }

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

        if (data.fill !== undefined) {
            this.fill = data.fill;
        }

        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}
