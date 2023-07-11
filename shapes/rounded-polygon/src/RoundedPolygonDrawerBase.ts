import { type ICoordinates, type IShapeDrawer, type Particle, getRangeValue } from "tsparticles-engine";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape";
import type { ISide } from "./ISide";

/**
 * @param sides -
 * @param radius -
 * @param rot -
 * @returns polygon coordinates
 */
function polygon(sides: number, radius: number, rot = 0): ICoordinates[] {
    let i = 0;
    const step = (Math.PI * 2) / sides,
        path: ICoordinates[] = [];
    while (i < sides) {
        path.push({ x: Math.cos(i * step + rot) * radius, y: Math.sin(i++ * step + rot) * radius });
    }
    return path;
}

/**
 * @param context -
 * @param path -
 * @param radius -
 */
function roundedPath(context: CanvasRenderingContext2D, path: ICoordinates[], radius: number): void {
    let i = 0,
        p1 = path[i++],
        p2 = path[i];

    const len = path.length;

    context.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

    while (i <= len) {
        p1 = p2;
        p2 = path[++i % len];
        context.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, radius);
    }
}

/**
 */
export abstract class RoundedPolygonDrawerBase implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: Particle, radius: number): void {
        const barWidth = 10,
            cornerRadius = (particle.shapeData as IRoundedPolygonShape)?.borderRadius ?? 10,
            polyRadius = radius,
            inset = 1,
            barRadius = polyRadius - barWidth * inset,
            approxLineLen = barRadius * Math.PI * 2,
            sides = particle.sides,
            hexPoly = polygon(sides, polyRadius);

        context.setLineDash([approxLineLen]);

        roundedPath(context, hexPoly, cornerRadius);
    }

    getSidesCount(particle: Particle): number {
        const roundedPolygon = particle.shapeData as IRoundedPolygonShape,
            sides = Math.round(getRangeValue(roundedPolygon?.sides ?? 5));

        return sides;
    }

    abstract getCenter(particle: Particle, radius: number): ICoordinates;

    abstract getSidesData(particle: Particle, radius: number): ISide;
}
