import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
    draw(data: IShapeDrawData<StarParticle>): void {
        const { context, particle, radius } = data,
            sides = particle.sides,
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
        const star = particle.shapeData as IStarShape | undefined;

        return Math.round(getRangeValue(star?.sides ?? 5));
    }

    particleInit(container: Container, particle: StarParticle): void {
        const star = particle.shapeData as IStarShape | undefined;

        particle.starInset = getRangeValue(star?.inset ?? 2);
    }
}
