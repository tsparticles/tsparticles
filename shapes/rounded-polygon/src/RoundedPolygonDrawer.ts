import {
    type Container,
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const double = 2,
    doublePI = Math.PI * double,
    half = 0.5,
    defaultSides = 5,
    defaultRotation = 0,
    defaultRadius = 5;

/**
 * @param sides -
 * @param radius -
 * @param rot -
 * @returns polygon coordinates
 */
function polygon(sides: number, radius: number, rot = defaultRotation): ICoordinates[] {
    const step = doublePI / sides,
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
    const index1 = 0,
        index2 = 1,
        increment = 1;

    let p1 = path[index1],
        p2 = path[index2];

    const len = path.length;

    context.moveTo((p1.x + p2.x) * half, (p1.y + p2.y) * half);

    for (let i = 1; i <= len; i++) {
        p1 = p2;
        p2 = path[(i + increment) % len];

        context.arcTo(p1.x, p1.y, (p1.x + p2.x) * half, (p1.y + p2.y) * half, radius);
    }
}

/**
 */
export class RoundedPolygonDrawer implements IShapeDrawer<RoundedParticle> {
    draw(data: IShapeDrawData<RoundedParticle>): void {
        const { context, particle, radius } = data;

        roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? defaultRadius);
    }

    getSidesCount(particle: Particle): number {
        const roundedPolygon = particle.shapeData as IRoundedPolygonShape | undefined;

        return Math.round(getRangeValue(roundedPolygon?.sides ?? defaultSides));
    }

    particleInit(container: Container, particle: RoundedParticle): void {
        const shapeData = particle.shapeData as IRoundedPolygonShape | undefined;

        particle.borderRadius =
            Math.round(getRangeValue(shapeData?.radius ?? defaultSides)) * container.retina.pixelRatio;
    }
}
