import type { IParticle, IShapeDrawer } from "@tsparticles/engine";

const fixFactor = Math.sqrt(2);

/**
 */
export class SquareDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const fixedRadius = radius / fixFactor,
            fixedDiameter = fixedRadius * 2;

        context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
    }

    getSidesCount(): number {
        return 4;
    }
}
