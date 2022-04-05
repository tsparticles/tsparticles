import type { IParticle } from "../../Core/Interfaces/IParticle";
import type { IShapeDrawer } from "../../Core/Interfaces/IShapeDrawer";

/**
 * @category Shape Drawers
 */
export class CircleDrawer implements IShapeDrawer {
    getSidesCount(): number {
        return 12;
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
}
