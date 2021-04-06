import type { IParticle, IShapeDrawer } from "tsparticles-engine";

/**
 * @category Shape Drawers
 */
export class LineDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 1;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.moveTo(0, -radius / 2);
        context.lineTo(0, radius / 2);
    }
}
