import {IPolygonShape} from "../../../../Interfaces/Options/Shape/IPolygonShape";

export class PolygonShape implements IPolygonShape {
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
    public set nb_sides(value) {
        this.sides = value;
    }

    public sides: number;

    constructor() {
        this.sides = 5;
    }
}
