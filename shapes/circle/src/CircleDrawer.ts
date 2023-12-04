import { type Container, type IShapeDrawData, type IShapeDrawer, isObject } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";
import type { ICircleShapeData } from "./ICircleShapeData.js";

/**
 */
export class CircleDrawer implements IShapeDrawer<CircleParticle> {
    draw(data: IShapeDrawData<CircleParticle>): void {
        const { context, particle, radius } = data;

        if (!particle.circleRange) {
            particle.circleRange = { min: 0, max: Math.PI * 2 };
        }

        const circleRange = particle.circleRange;

        context.arc(0, 0, radius, circleRange.min, circleRange.max, false);
    }

    getSidesCount(): number {
        return 12;
    }

    particleInit(container: Container, particle: CircleParticle): void {
        const shapeData = particle.shapeData as ICircleShapeData | undefined,
            angle = shapeData?.angle ?? {
                max: 360,
                min: 0,
            };

        particle.circleRange = !isObject(angle)
            ? {
                  min: 0,
                  max: (angle * Math.PI) / 180,
              }
            : { min: (angle.min * Math.PI) / 180, max: (angle.max * Math.PI) / 180 };
    }
}
