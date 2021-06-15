import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";

/**
 * @category Shape Drawers
 */
export class LineDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 1;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);
    }
}
