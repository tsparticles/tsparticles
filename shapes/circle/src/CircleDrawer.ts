import type { Container, IShapeDrawer } from "tsparticles-engine";
import type { CircleParticle } from "./CircleParticle";
import type { ICircleShapeData } from "./ICircleShapeData";

/**
 * @category Shape Drawers
 */
export class CircleDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: CircleParticle, radius: number): void {
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
        const shapeData = particle.shapeData as ICircleShapeData,
            angle = shapeData?.angle ?? {
                max: 360,
                min: 0,
            };

        particle.circleRange =
            typeof angle !== "object"
                ? {
                      min: 0,
                      max: (angle * Math.PI) / 180,
                  }
                : { min: (angle.min * Math.PI) / 180, max: (angle.max * Math.PI) / 180 };
    }
}
