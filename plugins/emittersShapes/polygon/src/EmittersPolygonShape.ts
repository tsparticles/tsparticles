import { type ICoordinates, type IDimension } from "@tsparticles/engine";
import {
    generateRandomPointOnPolygonPerimeter,
    generateRandomPointWithinPolygon,
    generateRandomPolygon,
} from "./utils.js";
import { EmitterShapeBase } from "@tsparticles/plugin-emitters";
import type { EmittersPolygonShapeOptions } from "./Options/Classes/EmittersPolygonShapeOptions.js";

export class EmittersPolygonShape extends EmitterShapeBase<EmittersPolygonShapeOptions> {
    angle: number;
    polygon: ICoordinates[];
    sides: number;

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersPolygonShapeOptions) {
        super(position, size, fill, options);

        this.sides = options.sides;
        this.angle = (options.angle * Math.PI) / 180;
        this.polygon = generateRandomPolygon(position, this.sides, size.width / 2, this.angle);
    }

    async init(): Promise<void> {
        // nothing to do
    }

    async randomPosition(): Promise<ICoordinates | null> {
        const fill = this.fill,
            polygon = this.polygon;

        return fill ? generateRandomPointWithinPolygon(polygon) : generateRandomPointOnPolygonPerimeter(polygon);
    }

    resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);

        this.polygon = generateRandomPolygon(position, this.sides, size.width / 2, this.angle);
    }
}
