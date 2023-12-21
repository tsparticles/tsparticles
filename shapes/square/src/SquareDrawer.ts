import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

const fixFactorSquared = 2,
    fixFactor = Math.sqrt(fixFactorSquared),
    sides = 4,
    double = 2;

/**
 */
export class SquareDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, radius } = data,
            fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * double;

        context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
    }

    getSidesCount(): number {
        return sides;
    }
}
