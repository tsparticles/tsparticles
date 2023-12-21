import {
    type Container,
    type ICoordinates,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";

const defaultInset = 2,
    origin: ICoordinates = { x: 0, y: 0 },
    defaultSides = 5;

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
    draw(data: IShapeDrawData<StarParticle>): void {
        const { context, particle, radius } = data,
            sides = particle.sides,
            inset = particle.starInset ?? defaultInset;

        context.moveTo(origin.x, origin.y - radius);

        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(origin.x, origin.y - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(origin.x, origin.y - radius);
        }
    }

    getSidesCount(particle: Particle): number {
        const star = particle.shapeData as IStarShape | undefined;

        return Math.round(getRangeValue(star?.sides ?? defaultSides));
    }

    particleInit(container: Container, particle: StarParticle): void {
        const star = particle.shapeData as IStarShape | undefined;

        particle.starInset = getRangeValue(star?.inset ?? defaultInset);
    }
}
