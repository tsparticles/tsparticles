import type { IShapeDrawData } from "@tsparticles/engine";

const fixFactorSquared = 2,
    fixFactor = Math.sqrt(fixFactorSquared),
    double = 2;

/**
 *
 * @param data -
 */
export function drawSquare(data: IShapeDrawData): void {
    const { context, radius } = data,
        fixedRadius = radius / fixFactor,
        fixedDiameter = fixedRadius * double;

    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
}
