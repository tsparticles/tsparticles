import type { IParticle, IShapeDrawer } from "tsparticles-engine";

/**
 * @category Shape Drawers
 */
export class SquareDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 4;
    }

    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const f = Math.sqrt(2);

        context.rect(-radius / f, -radius / f, (radius * 2) / f, (radius * 2) / f);
    }
}
