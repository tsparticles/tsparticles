import type { IShapeDrawer } from "tsparticles-engine/Core/Interfaces/IShapeDrawer";
import type { IParticle } from "tsparticles-engine";

export class BubbleDrawer implements IShapeDrawer {
    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }

    afterEffect(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.save();
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
        context.restore();
    }
}
