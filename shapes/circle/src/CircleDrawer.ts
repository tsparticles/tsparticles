import type { Container, ICoordinates, IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
import type { ICircleShapeData } from "./ICircleShapeData.js";

const double = 2,
    doublePI = Math.PI * double,
    sides = 12,
    maxAngle = 360,
    minAngle = 0,
    origin: ICoordinates = { x: 0, y: 0 };

/**
 */
export class CircleDrawer implements IShapeDrawer<CircleParticle> {
    draw(data: IShapeDrawData<CircleParticle>): void {
        const { context, particle, radius } = data;

        if (!particle.circleRange) {
            particle.circleRange = { min: minAngle, max: doublePI };
        }

        const circleRange = particle.circleRange;

        context.arc(origin.x, origin.y, radius, circleRange.min, circleRange.max, false);
    }

    getSidesCount(): number {
        return sides;
    }

    async particleInit(container: Container, particle: CircleParticle): Promise<void> {
        const shapeData = particle.shapeData as ICircleShapeData | undefined,
            angle = shapeData?.angle ?? {
                max: maxAngle,
                min: minAngle,
            },
            { degToRad, isObject } = await import("@tsparticles/engine");

        particle.circleRange = !isObject(angle)
            ? {
                  min: minAngle,
                  max: degToRad(angle),
              }
            : { min: degToRad(angle.min), max: degToRad(angle.max) };
    }
}
