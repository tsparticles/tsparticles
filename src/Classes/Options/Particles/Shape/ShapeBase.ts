import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IShapeValues } from "../../../../Interfaces/Options/Particles/Shape/IShapeValues";
import { Particles } from "../Particles";

export class ShapeBase implements IShapeValues {
    public close?: boolean;
    public fill?: boolean;
    public particles?: Particles;

    constructor() {
        this.fill = true;
        this.close = true;
    }

    public load(data?: RecursivePartial<IShapeValues>): void {
        if (data !== undefined) {
            if (data.fill !== undefined) {
                this.fill = data.fill;
            }

            if (data.particles !== undefined) {
                this.particles = new Particles();

                this.particles.load(data.particles);
            }
        }
    }
}
