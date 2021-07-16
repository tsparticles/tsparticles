import type { IParticle, IShapeDrawer } from "../../Core/Interfaces";

/**
 * @category Shape Drawers
 */
export class SquareDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 4;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.rect(-radius, -radius, radius * 2, radius * 2);
    }
}
