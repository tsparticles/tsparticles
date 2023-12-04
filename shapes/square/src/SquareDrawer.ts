import type { IShapeDrawData, IShapeDrawer } from "@tsparticles/engine";

const fixFactor = Math.sqrt(2);

/**
 */
export class SquareDrawer implements IShapeDrawer {
    draw(data: IShapeDrawData): void {
        const { context, radius } = data,
            fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * 2;

        context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
    }

    getSidesCount(): number {
        return 4;
    }
}
