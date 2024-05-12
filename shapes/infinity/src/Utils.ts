import type { ICoordinates, IShapeDrawData } from "@tsparticles/engine";

const origin: ICoordinates = {
        x: 0,
        y: 0,
    },
    loopSizeFactor = 0.55;

/**
 * @param data -
 */
export function drawInfinity(data: IShapeDrawData): void {
    const { context, radius } = data,
        loopControl = radius * loopSizeFactor;

    context.moveTo(origin.x, origin.y);
    context.bezierCurveTo(loopControl, -radius, loopControl, radius, origin.x, origin.y);
    context.moveTo(origin.x, origin.y);
    context.bezierCurveTo(-loopControl, -radius, origin.x - loopControl, radius, origin.x, origin.y);
}
