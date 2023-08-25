import {
    type Container,
    type ICoordinates,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape.js";
import type { RoundedParticle } from "./RoundedParticle.js";

/**
 * @param sides -
 * @param radius -
 * @param rot -
 * @returns polygon coordinates
 */
function polygon(sides: number, radius: number, rot = 0): ICoordinates[] {
    const step = (Math.PI * 2) / sides,
        path: ICoordinates[] = [];

    for (let i = 0; i < sides; i++) {
        path.push({ x: Math.cos(i * step + rot) * radius, y: Math.sin(i * step + rot) * radius });
    }

    return path;
}

/**
 * @param context -
 * @param path -
 * @param radius -
 */
function roundedPath(context: CanvasRenderingContext2D, path: ICoordinates[], radius: number): void {
    let p1 = path[0],
        p2 = path[1];

    const len = path.length;

    context.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);

    for (let i = 1; i <= len; i++) {
        p1 = p2;
        p2 = path[(i + 1) % len];

        context.arcTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2, radius);
    }
}

/**
 */
export class RoundedPolygonDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: RoundedParticle, radius: number): void {
        roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? 5);
    }

    getSidesCount(particle: Particle): number {
        const roundedPolygon = particle.shapeData as IRoundedPolygonShape;

        return Math.round(getRangeValue(roundedPolygon?.sides ?? 5));
    }

    particleInit(container: Container, particle: RoundedParticle): void {
        const shapeData = particle.shapeData as IRoundedPolygonShape;

        particle.borderRadius = Math.round(getRangeValue(shapeData?.radius ?? 5)) * container.retina.pixelRatio;
    }
}
