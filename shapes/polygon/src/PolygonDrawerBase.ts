import {
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";

const defaultSides = 5;

/**
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
    async draw(data: IShapeDrawData): Promise<void> {
        const { particle, radius } = data,
            start = this.getCenter(particle, radius),
            side = this.getSidesData(particle, radius),
            { drawPolygon } = await import("./Utils.js");

        drawPolygon(data, start, side);
    }

    getSidesCount(particle: Particle): number {
        const polygon = particle.shapeData as IPolygonShape | undefined;

        return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
    }

    abstract getCenter(particle: Particle, radius: number): ICoordinates;

    abstract getSidesData(particle: Particle, radius: number): ISide;
}
