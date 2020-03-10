import {IPolygonShape} from "../../../../Interfaces/Options/Shape/IPolygonShape";
import {Messages} from "../../../Utils/Messages";
import {Utils} from "../../../Utils/Utils";

export class PolygonShape implements IPolygonShape {
    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     */
    public get nb_sides(): number {
        Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

        return this.sides;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new sides
     * @param value
     */
    public set nb_sides(value: number) {
        Messages.deprecated("particles.shape.polygon.nb_sides", "particles.shape.polygon.sides");

        this.sides = value;
    }

    public sides: number;

    constructor() {
        this.sides = 5;
    }

    public load(data: IPolygonShape): void {
        if (Utils.hasData(data)) {
            const sides = data.sides ?? data.nb_sides;

            if (Utils.hasData(sides)) {
                this.sides = sides;
            }
        }
    }
}
