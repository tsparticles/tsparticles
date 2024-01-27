import {
    type ICoordinates,
    type Particle,
    type Range,
    Vector,
    clamp,
    getDistances,
    getEasing,
} from "@tsparticles/engine";
import type { AttractContainer } from "./Types.js";

const minFactor = 1,
    identity = 1;

/**
 *
 * @param container
 * @param position
 * @param attractRadius
 * @param area
 * @param queryCb
 */
export function processAttract(
    container: AttractContainer,
    position: ICoordinates,
    attractRadius: number,
    area: Range,
    queryCb: (p: Particle) => boolean,
): void {
    const attractOptions = container.actualOptions.interactivity.modes.attract;

    if (!attractOptions) {
        return;
    }

    const query = container.particles.quadTree.query(area, queryCb);

    for (const particle of query) {
        const { dx, dy, distance } = getDistances(particle.position, position),
            velocity = attractOptions.speed * attractOptions.factor,
            attractFactor = clamp(
                getEasing(attractOptions.easing)(identity - distance / attractRadius) * velocity,
                minFactor,
                attractOptions.maxSpeed,
            ),
            normVec = Vector.create(
                !distance ? velocity : (dx / distance) * attractFactor,
                !distance ? velocity : (dy / distance) * attractFactor,
            );

        particle.position.subFrom(normVec);
    }
}
