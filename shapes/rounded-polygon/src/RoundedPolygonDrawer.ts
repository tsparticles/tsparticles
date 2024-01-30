import {
    type Container,
    type IShapeDrawData,
    type IShapeDrawer,
    type Particle,
    getRangeValue,
} from "@tsparticles/engine";
import type { IRoundedPolygonShape } from "./IRoundedPolygonShape.js";
import type { RoundedParticle } from "./RoundedParticle.js";

const defaultSides = 5,
    defaultRadius = 5;

/**
 */
export class RoundedPolygonDrawer implements IShapeDrawer<RoundedParticle> {
    async draw(data: IShapeDrawData<RoundedParticle>): Promise<void> {
        const { context, particle, radius } = data,
            { polygon, roundedPath } = await import("./Utils.js");

        roundedPath(context, polygon(particle.sides, radius), particle.borderRadius ?? defaultRadius);
    }

    getSidesCount(particle: Particle): number {
        const roundedPolygon = particle.shapeData as IRoundedPolygonShape | undefined;

        return Math.round(getRangeValue(roundedPolygon?.sides ?? defaultSides));
    }

    async particleInit(container: Container, particle: RoundedParticle): Promise<void> {
        const shapeData = particle.shapeData as IRoundedPolygonShape | undefined;

        particle.borderRadius =
            Math.round(getRangeValue(shapeData?.radius ?? defaultSides)) * container.retina.pixelRatio;

        await Promise.resolve();
    }
}
