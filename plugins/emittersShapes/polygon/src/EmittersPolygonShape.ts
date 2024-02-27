import { EmitterShapeBase, type IRandomPositionData } from "@tsparticles/plugin-emitters";
import { type ICoordinates, type IDimension, degToRad } from "@tsparticles/engine";
import {
    generateRandomPointOnPolygonPerimeter,
    generateRandomPointWithinPolygon,
    generateRandomPolygon,
} from "./utils.js";
import type { EmittersPolygonShapeOptions } from "./Options/Classes/EmittersPolygonShapeOptions.js";

const half = 0.5;

export class EmittersPolygonShape extends EmitterShapeBase<EmittersPolygonShapeOptions> {
    angle: number;
    polygon: ICoordinates[];
    sides: number;

    constructor(position: ICoordinates, size: IDimension, fill: boolean, options: EmittersPolygonShapeOptions) {
        super(position, size, fill, options);

        this.sides = options.sides;
        this.angle = degToRad(options.angle);
        this.polygon = generateRandomPolygon(position, this.sides, size.width * half, this.angle);
    }

    async init(): Promise<void> {
        // nothing to do
    }

    randomPosition(): IRandomPositionData | null {
        const fill = this.fill,
            polygon = this.polygon,
            res = fill ? generateRandomPointWithinPolygon(polygon) : generateRandomPointOnPolygonPerimeter(polygon);

        return res ? { position: res } : null;
    }

    resize(position: ICoordinates, size: IDimension): void {
        super.resize(position, size);

        this.polygon = generateRandomPolygon(position, this.sides, size.width * half, this.angle);
    }
}
