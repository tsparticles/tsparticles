import type { IShapeDrawer } from "../Core/Interfaces/IShapeDrawer";
import type { IParticle } from "../Core/Interfaces/IParticle";

export class LineDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number, _opacity: number): void {
        context.moveTo(0, -radius / 2);
        context.lineTo(0, radius / 2);
    }
}
