import { type IShapeDrawData, doublePI, originPoint } from "@tsparticles/engine";
import type { CircleParticle } from "./CircleParticle.js";

const minAngle = 0;

/**
 *
 * @param data - The shape draw data.
 */
export function drawCircle(data: IShapeDrawData<CircleParticle>): void {
    const { context, particle, radius } = data;

    particle.circleRange ??= { min: minAngle, max: doublePI };

    const circleRange = particle.circleRange;

    context.arc(originPoint.x, originPoint.y, radius, circleRange.min, circleRange.max, false);
}
