import type { Container, IShapeDrawer, Particle } from "tsparticles-engine";
import type { IStarShape } from "./IStarShape";
import type { StarParticle } from "./StarParticle";
import { getRangeValue } from "tsparticles-engine";

/**
 * @category Shape Drawers
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

        return Math.round(getRangeValue(star?.sides ?? star?.nb_sides ?? 5));
    }

    particleInit(container: Container, particle: StarParticle): void {
        const star = particle.shapeData as IStarShape,
            inset = getRangeValue(star?.inset ?? 2);

        particle.starInset = inset;
    }
}
