import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class LineDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.moveTo(0, -radius / 2);
        context.lineTo(0, radius / 2);
    }
}
