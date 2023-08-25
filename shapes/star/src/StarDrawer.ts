import { type Container, type IShapeDrawer, type Particle, getRangeValue } from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";

/**
 */
export class StarDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: StarParticle, radius: number): void {
        const sides = particle.sides,
            inset = particle.starInset ?? 2;

        context.moveTo(0, 0 - radius);

        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }

    getSidesCount(particle: Particle): number {
        const star = particle.shapeData as IStarShape;

        return Math.round(getRangeValue(star?.sides ?? 5));
    }

    particleInit(container: Container, particle: StarParticle): void {
        const star = particle.shapeData as IStarShape;

        particle.starInset = getRangeValue(star?.inset ?? 2);
    }
}
