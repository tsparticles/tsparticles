import {
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    degToRad,
    getRangeValue,
} from "@tsparticles/engine";
import type { IPolygonShape } from "./IPolygonShape.js";
import type { ISide } from "./ISide.js";

const piDeg = 180,
    origin: ICoordinates = { x: 0, y: 0 },
    defaultSides = 5,
    sidesOffset = 2;

/**
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, particle, radius } = data,
            start = this.getCenter(particle, radius),
            side = this.getSidesData(particle, radius),
            sideCount = side.count.numerator * side.count.denominator,
            decimalSides = side.count.numerator / side.count.denominator,
            interiorAngleDegrees = (piDeg * (decimalSides - sidesOffset)) / decimalSides,
            interiorAngle = Math.PI - degToRad(interiorAngleDegrees); // convert to radians

        if (!context) {
            return;
        }

        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(origin.x, origin.y);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, origin.y);
            context.translate(side.length, origin.y);
            context.rotate(interiorAngle);
        }
    }

    getSidesCount(particle: Particle): number {
        const polygon = particle.shapeData as IPolygonShape | undefined;

        return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
    }

    abstract getCenter(particle: Particle, radius: number): ICoordinates;

    abstract getSidesData(particle: Particle, radius: number): ISide;
}
