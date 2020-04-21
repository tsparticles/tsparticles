import type { IPolygonShape } from "../../../../Interfaces/Options/Particles/Shape/IPolygonShape";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { ShapeBase } from "./ShapeBase";

export class PolygonShape extends ShapeBase implements IPolygonShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     */
    public get nb_sides(): number {
        return this.sides;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     * @param value
     */
    public set nb_sides(value: number) {
        this.sides = value;
    }

    public sides: number;

    constructor() {
        super();
        this.sides = 5;
    }

    public load(data?: RecursivePartial<IPolygonShape>): void {
        super.load(data);

        if (data !== undefined) {
            const sides = data.sides ?? data.nb_sides;

            if (sides !== undefined) {
                this.sides = sides;
            }
        }
    }
}
