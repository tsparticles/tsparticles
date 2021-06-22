import type { IShapeDrawer } from "tsparticles/Core/Interfaces/IShapeDrawer";
import type { IParticle } from "tsparticles";

export class BubbleDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }

    afterEffect(context: CanvasRenderingContext2D, particle: IParticle, radius: number) {
        context.save();
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
        context.restore();
    }
}
