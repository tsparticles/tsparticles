import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IStarShape } from "./IStarShape.js";
import type { StarParticle } from "./StarParticle.js";
import { drawStar } from "./Utils.js";

const defaultInset = 2,
    defaultSides = 5;

/**
 */
export class StarDrawer implements IShapeDrawer<StarParticle> {
    readonly validTypes = ["star"] as const;

    draw(data: IShapeDrawData<StarParticle>): void {
        drawStar(data);
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
