import type { IParticle, IShapeDrawer } from "tsparticles-engine";

export class BubbleDrawer implements IShapeDrawer {
    afterEffect(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.beginPath();
        context.arc(radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = "#fff9";
        context.fill();
    }

    draw(context: CanvasRenderingContext2D, particle: IParticle, radius: number): void {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
}
