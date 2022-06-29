import type { IParticle, IShapeDrawer } from "tsparticles-engine";

/**
 * @category Shape Drawers
 */
export class LineDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);
    }

    getSidesCount(): number {
        return 1;
    }
}
