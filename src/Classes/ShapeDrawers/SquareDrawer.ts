import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class SquareDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number): void {
        context.rect(-radius, -radius, radius * 2, radius * 2);
    }
}
