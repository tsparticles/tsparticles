import type { ICoordinates, IShapeDrawData } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";

const double = 2,
    doublePI = Math.PI * double,
    minAngle = 0,
    origin: ICoordinates = { x: 0, y: 0 };

/**
 *
 * @param data - The shape draw data.
 */
export function drawCircle(data: IShapeDrawData<CircleParticle>): void {
    const { context, particle, radius } = data;

    particle.circleRange ??= { min: minAngle, max: doublePI };

    const circleRange = particle.circleRange;

    context.arc(origin.x, origin.y, radius, circleRange.min, circleRange.max, false);
}
