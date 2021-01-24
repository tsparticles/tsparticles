import type { IParticle, IShapeDrawer } from "tsparticles-core";

/**
 * @category Shape Drawers
 */
export class SquareDrawer implements IShapeDrawer {
    public getSidesCount(): number {
        return 4;
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.rect(-radius, -radius, radius * 2, radius * 2);
    }
}
