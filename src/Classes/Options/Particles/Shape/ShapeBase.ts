import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IShapeValues } from "../../../../Interfaces/Options/Particles/Shape/IShapeValues";
import { IParticles } from "../../../../Interfaces/Options/Particles/IParticles";

export class ShapeBase implements IShapeValues {
    public close?: boolean;
    public fill?: boolean;
    public particles?: RecursivePartial<IParticles>;

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
                this.particles = data.particles;
            }
        }
    }
}
