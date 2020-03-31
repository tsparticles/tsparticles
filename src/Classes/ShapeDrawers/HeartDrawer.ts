import type { IShapeDrawer } from "../../Interfaces/IShapeDrawer";
import type { IParticle } from "../../Interfaces/IParticle";

export class HeartDrawer implements IShapeDrawer {
    public draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        const x = -radius / 2;
        const y = -radius / 2;

        context.moveTo(x, y + radius / 4);
        context.quadraticCurveTo(x, y, x + radius / 4, y);
        context.quadraticCurveTo(x + radius / 2, y, x + radius / 2, y + radius / 4);
        context.quadraticCurveTo(x + radius / 2, y, x + radius * 3 / 4, y);
        context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 4);
        context.quadraticCurveTo(x + radius, y + radius / 2, x + radius * 3 / 4, y + radius * 3 / 4);
        context.lineTo(x + radius / 2, y + radius);
        context.lineTo(x + radius / 4, y + radius * 3 / 4);
        context.quadraticCurveTo(x, y + radius / 2, x, y + radius / 4);
    }
}
