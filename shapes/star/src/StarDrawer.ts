import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";

const defaultInset = 2,
    defaultSides = 5;

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
    async draw(data: IShapeDrawData<StarParticle>): Promise<void> {
        const { drawStar } = await import("./Utils.js");

        drawStar(data);
    }

    getSidesCount(particle: Particle): number {
        const star = particle.shapeData as IStarShape | undefined;

        return Math.round(getRangeValue(star?.sides ?? defaultSides));
    }

    async particleInit(container: Container, particle: StarParticle): Promise<void> {
        const star = particle.shapeData as IStarShape | undefined;

        particle.starInset = getRangeValue(star?.inset ?? defaultInset);

        await Promise.resolve();
    }
}
