import type { ICoordinates, IShapeDrawer, Particle } from "tsparticles-engine";
import type { IPolygonShape } from "./IPolygonShape";
import type { ISide } from "./ISide";
import { getRangeValue } from "tsparticles-engine";

/**
 * @category Shape Drawers
 */
export abstract class PolygonDrawerBase implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: Particle, radius: number): void {
        const start = this.getCenter(particle, radius),
            side = this.getSidesData(particle, radius),
            sideCount = side.count.numerator * side.count.denominator,
            decimalSides = side.count.numerator / side.count.denominator,
            interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides,
            interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians

        if (!context) {
            return;
        }

        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);

        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }
    }

    getSidesCount(particle: Particle): number {
        const polygon = particle.shapeData as IPolygonShape,
            sides = Math.round(getRangeValue(polygon?.sides ?? polygon?.nb_sides ?? 5));

        return sides;
    }

    abstract getCenter(particle: Particle, radius: number): ICoordinates;

    abstract getSidesData(particle: Particle, radius: number): ISide;
}
