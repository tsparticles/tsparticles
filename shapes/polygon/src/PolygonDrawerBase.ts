import {
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";
import { drawPolygon } from "./Utils.js";

const defaultSides = 5;

/**
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
    abstract readonly validTypes: readonly string[];

    draw(data: IShapeDrawData): void {
        const { particle, radius } = data,
            start = this.getCenter(particle, radius),
            side = this.getSidesData(particle, radius);

        drawPolygon(data, start, side);
    }

    getSidesCount(particle: Particle): number {
        const polygon = particle.shapeData as IPolygonShape | undefined;

        return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
    }

    abstract getCenter(particle: Particle, radius: number): ICoordinates;

    abstract getSidesData(particle: Particle, radius: number): ISide;
}
