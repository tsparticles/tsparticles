import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";

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
